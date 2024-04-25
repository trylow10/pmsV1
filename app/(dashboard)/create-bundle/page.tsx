import BundleForm from '../_components/BundleForm';
import { getSizesAndClothBySheetId } from '@/data/sheet/data';

type TParams = {
  searchParams: {
    sheetId: string;
  };
};

async function page(params: TParams) {
  const sheetId = params?.searchParams?.sheetId;
  const sheet: any = await getSizesAndClothBySheetId(sheetId);
  return <BundleForm data={sheet} />;
}

export default page;
