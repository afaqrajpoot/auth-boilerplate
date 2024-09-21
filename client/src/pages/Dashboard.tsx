import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to application</CardTitle>
        </CardHeader>
      </Card>
    </>
  );
}
