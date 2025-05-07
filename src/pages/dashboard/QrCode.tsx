import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, RefreshCw, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateQrCode } from "@/services/qrCode";
import { jsPDF } from "jspdf";

const QrCode = () => {
  const { toast } = useToast();
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [reviewUrl, setReviewUrl] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("standard");

  const generateNewQrCode = async (type: string) => {
    try {
      setIsGenerating(true);
      const data = await generateQrCode(type);
      setQrCodeData(data.qrCode);
      setReviewUrl(data.reviewUrl);
      setBusinessName(data.businessName);
      toast.success("QR Code generated successfully");
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateNewQrCode(activeTab);
  }, [activeTab]);

  const handleRegenerateQr = () => {
    generateNewQrCode(activeTab);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewUrl);
    toast({
      title: "Link Copied",
      description: "Review link copied to clipboard",
    });
  };

  const handleDownload = (format: string) => {
    if (!qrCodeData) {
      toast.error("No QR code available to download");
      return;
    }

    try {
      if (format === "png") {
        downloadAsPng();
      } else if (format === "pdf") {
        downloadAsPdf();
      }

      toast({
        title: "Download Started",
        description: `Downloading QR code in ${format.toUpperCase()} format`,
      });
    } catch (error) {
      console.error(`Error downloading as ${format}:`, error);
      toast.error(`Failed to download as ${format.toUpperCase()}`);
    }
  };

  // Function to download QR code as PNG
  const downloadAsPng = () => {
    // Create a temporary link element
    const link = document.createElement("a");

    // Set the href to the QR code data URL
    link.href = qrCodeData as string;

    // Set filename based on active tab
    const fileName = businessName
      ? `${businessName
          .replace(/\s+/g, "-")
          .toLowerCase()}-qr-code-${activeTab}.png`
      : `qr-code-${activeTab}.png`;

    link.download = fileName;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to download QR code as PDF directly
  const downloadAsPdf = () => {
    // Create new PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Determine which type of QR code is active
    let title = "";
    if (activeTab === "standard") {
      title = "Standard QR Code";
    } else if (activeTab === "table") {
      title = "Table Tent QR Code";
    } else if (activeTab === "poster") {
      title = "Poster QR Code";
    }

    // Add business name and title to PDF
    pdf.setFontSize(16);
    pdf.text(businessName || "Your Business", 105, 20, { align: "center" });

    pdf.setFontSize(14);
    pdf.text(title, 105, 30, { align: "center" });

    // Add QR code image to PDF
    if (qrCodeData) {
      // Position the QR code in the center of the page
      pdf.addImage(qrCodeData, "PNG", 65, 40, 80, 80);

      // Add review URL below the QR code
      pdf.setFontSize(10);
      pdf.text(`Review URL: ${reviewUrl}`, 105, 130, { align: "center" });

      // Add instructions
      pdf.setFontSize(12);
      pdf.text("Scan the QR code to leave a review", 105, 140, {
        align: "center",
      });
    }

    // Set the file name
    const fileName = businessName
      ? `${businessName
          .replace(/\s+/g, "-")
          .toLowerCase()}-qr-code-${activeTab}.pdf`
      : `qr-code-${activeTab}.pdf`;

    // Save the PDF and download it
    pdf.save(fileName);
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Prepare to print your QR code",
    });
  };

  return (
    <DashboardLayout title="QR Code Generator">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-muted-foreground">
          Create custom QR codes for {businessName} to collect customer reviews
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your QR Code</CardTitle>
            <CardDescription>
              When customers scan this QR code, they'll be asked to rate their
              experience
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
              {isGenerating ? (
                <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 animate-pulse">
                  <RefreshCw className="animate-spin text-muted-foreground" />
                </div>
              ) : (
                <img
                  src={qrCodeData || ""}
                  alt="QR Code"
                  className="w-[200px] h-[200px]"
                />
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateQr}
                disabled={isGenerating}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Options</CardTitle>
            <CardDescription>
              Download your QR code in various formats for different uses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="standard"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="table">Table Tent</TabsTrigger>
                <TabsTrigger value="poster">Poster</TabsTrigger>
              </TabsList>
              <TabsContent value="standard" className="mt-4">
                <div className="bg-gray-100 rounded-lg p-4 mb-4 aspect-square flex items-center justify-center">
                  <img
                    src={qrCodeData || ""}
                    alt="Standard QR Code"
                    className="w-2/3 h-2/3"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Standard QR code perfect for business cards, receipts, or
                  small displays.
                </p>
              </TabsContent>
              <TabsContent value="table" className="mt-4">
                <div className="bg-gray-100 rounded-lg p-4 mb-4 aspect-[4/5] flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center w-4/5">
                    <h3 className="font-bold mb-2">Please Rate Us!</h3>
                    <div className="flex justify-center">
                      <img
                        src={qrCodeData || ""}
                        alt="Table Tent QR Code"
                        className="w-40 h-40"
                      />
                    </div>
                    <p className="text-sm mt-2">
                      Scan to share your experience
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Table tent design perfect for restaurant tables or
                  countertops.
                </p>
              </TabsContent>
              <TabsContent value="poster" className="mt-4">
                <div className="bg-gray-100 rounded-lg p-4 mb-4 aspect-[3/4] flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center w-4/5">
                    <h3 className="font-bold text-xl mb-1">
                      Enjoyed Your Visit?
                    </h3>
                    <p className="text-sm mb-4">
                      Let us know by leaving a review!
                    </p>
                    <div className="flex justify-center">
                      <img
                        src={qrCodeData || ""}
                        alt="Poster QR Code"
                        className="w-40 h-40"
                      />
                    </div>
                    <p className="text-sm mt-4">Thank you for your feedback!</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Poster design for wall displays or larger signage.
                </p>
              </TabsContent>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button onClick={() => handleDownload("png")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
                <Button variant="outline" onClick={() => handleDownload("pdf")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>QR Code Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Placement Tips</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Place at eye level for easy scanning</li>
                <li>• Add to receipts and packaging</li>
                <li>• Include on business cards</li>
                <li>• Put on tables or near exits</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Printing Instructions</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use high-quality printer</li>
                <li>• Maintain at least 1" square size</li>
                <li>• Ensure clear contrast</li>
                <li>• Test scan before distributing</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Encourage Scanning</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Add a clear call to action</li>
                <li>• Offer small incentives</li>
                <li>• Have staff mention the QR code</li>
                <li>• Use eye-catching designs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Review URL: <span className="font-mono">{reviewUrl}</span>
        </p>
      </div>
    </DashboardLayout>
  );
};

export default QrCode;
