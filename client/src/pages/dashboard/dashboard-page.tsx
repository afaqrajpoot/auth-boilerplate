import {
  PageHeader,
  PageHeaderHeading,
  Card,
  CardHeader,
  CardTitle,
} from "@/components";

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
