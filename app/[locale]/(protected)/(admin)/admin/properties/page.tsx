import AdminProperties from "@/components/admin/AdminProperties";
import MyProperties from "@/components/properties/MyProperties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTranslations } from "next-intl/server";

const PropertiesAdminPage = async () => {
  const t = await getTranslations("navbar");
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-text md:text-3xl">
          {t("properties")}
        </h2>
      </div>
      <Tabs defaultValue="approved" className="mt-6 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="approved">
          <AdminProperties status="APPROVED" />
        </TabsContent>
        <TabsContent value="pending">
          <AdminProperties status="PENDING" />
        </TabsContent>
        <TabsContent value="rejected">
          <AdminProperties status="REJECTED"/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesAdminPage;
