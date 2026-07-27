import FrontEndLayout from "@/components/layouts/FrontEndLayout";
import Navbar from "@/components/navbar/Navbar";
import MyProperties from "@/components/properties/MyProperties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";


export const dynamic = "force-dynamic";

const PropertiesPage = () => {
  const t = useTranslations("navbar");
  return (
    <FrontEndLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            {t("properties")}
          </h2>
        </div>
        <Tabs defaultValue="approved" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="approved">
            <MyProperties status="APPROVED" />
          </TabsContent>
          <TabsContent value="pending">
            <MyProperties status="PENDING" />
          </TabsContent>
          <TabsContent value="rejected">
            <MyProperties status="REJECTED" />
          </TabsContent>
        </Tabs>
      </div>
    </FrontEndLayout>
  );
};

export default PropertiesPage;
