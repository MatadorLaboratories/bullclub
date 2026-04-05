import { NftDetailPage } from "@/components/features/collection/NftDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NftDetail({ params }: Props) {
  const { id } = await params;
  return <NftDetailPage tokenId={id} />;
}
