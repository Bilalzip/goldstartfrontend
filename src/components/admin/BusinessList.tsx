import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Mail, Ban, Eye, Download, Filter } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function BusinessList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilters, setStatusFilters] = useState({
    active: true,
    inactive: true,
    suspended: true,
    overdue: true,
  });
  const navigate = useNavigate();

  const handleViewDetails = async (id) => {
    try {
      navigate(`/admin/businesses/${id}`);
    } catch (error) {
      toast.error("Failed to navigate to business details");
    }
  };

  const handleSendInvoice = async (id) => {
    try {
      setLoading(true);
      await api.post(`/auth/admin/businesses/${id}/send-invoice`);
      toast.success("Invoice sent successfully");
    } catch (error) {
      toast.error("Failed to send invoice");
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async (id) => {
    if (!window.confirm("Are you sure you want to suspend this business?")) {
      return;
    }

    try {
      setLoading(true);
      await api.post(`/auth/admin/businesses/${id}/suspend`);
      toast.success("Service suspended successfully");
      await fetchBusinesses(); // Refresh data
    } catch (error) {
      toast.error("Failed to suspend service");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      accessorKey: "business_name",
      header: "Business Name",
    },
    {
      accessorKey: "owner_name",
      header: "Owner",
    },
    {
      accessorKey: "subscription_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("subscription_status");
        if (!status)
          return (
            <div className="px-2 py-1 rounded-full text-xs font-medium inline-block bg-gray-100 text-gray-800">
              Inactive
            </div>
          );

        return (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium inline-block
            ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : status === "overdue"
                ? "bg-red-100 text-red-800"
                : status === "suspended"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        );
      },
    },
    {
      accessorKey: "last_payment_date",
      header: "Last Payment",
      cell: ({ row }) => {
        const date = row.getValue("last_payment_date");
        return date ? new Date(date).toLocaleDateString() : "No payment";
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const business = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewDetails(business.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSendInvoice(business.id)}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invoice
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSuspend(business.id)}
                className="text-red-600"
              >
                <Ban className="mr-2 h-4 w-4" />
                Suspend Service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    // Apply filters whenever data or statusFilters change
    applyFilters();
  }, [data, statusFilters]);

  const fetchBusinesses = async () => {
    try {
      const response = await api.get("/auth/admin/businesses");
      setData(response.data);
    } catch (error) {
      toast.error("Failed to fetch businesses");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    // Filter the data based on selected status filters
    const filtered = data.filter((business) => {
      const status = business.subscription_status || "inactive";
      return statusFilters[status.toLowerCase()];
    });

    setFilteredData(filtered);
  };

  const toggleStatusFilter = (status) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const handleExport = () => {
    try {
      // Only export the filtered data
      const exportData = filteredData.map((item) => ({
        "Business Name": item.business_name,
        "Owner Name": item.owner_name,
        Email: item.email,
        Status: item.subscription_status || "Inactive",
        "Last Payment Date": item.last_payment_date
          ? new Date(item.last_payment_date).toLocaleDateString()
          : "No payment",
        "Last Payment Amount": item.last_payment_amount
          ? `$${item.last_payment_amount}`
          : "N/A",
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Businesses");
      const fileName = `businesses_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      XLSX.writeFile(wb, fileName);
      toast.success("Export successful");
    } catch (error) {
      toast.error("Failed to export data");
      console.error("Export error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Businesses</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Status Filter</p>
                <DropdownMenuCheckboxItem
                  checked={statusFilters.active}
                  onCheckedChange={() => toggleStatusFilter("active")}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilters.inactive}
                  onCheckedChange={() => toggleStatusFilter("inactive")}
                >
                  Inactive
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilters.suspended}
                  onCheckedChange={() => toggleStatusFilter("suspended")}
                >
                  Suspended
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilters.overdue}
                  onCheckedChange={() => toggleStatusFilter("overdue")}
                >
                  Overdue
                </DropdownMenuCheckboxItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} loading={loading} />
    </div>
  );
}
