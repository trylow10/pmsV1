import { redirect } from 'next/navigation';
import BundleForm from '../_components/BundleForm';
import { getAllWorker, getSizesAndClothBySheetId } from '@/data/sheet/data';

// import { TWorker } from '@/types/cloth.types';

type TParams = {
  searchParams: {
    sheetId: string;
  };
};

async function page(params: TParams) {
  const sheetId = params?.searchParams?.sheetId;
  // if (!sheetId) return redirect('/');
  const sheet: any = await getSizesAndClothBySheetId(sheetId);
  const workers: any = await getAllWorker();

  return (
    <BundleForm
      data={sheet}
      workers={workers}
      Sizes={sheet?.Size}
      cloth={sheet?.cloth?.companyCloth}
    />
  );
}

export default page;
