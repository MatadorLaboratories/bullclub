import { AirdropDetailPage } from "@/components/features/airdrops/AirdropDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AirdropDetail({ params }: Props) {
  const { id } = await params;
  return <AirdropDetailPage airdropId={id} />;
}
