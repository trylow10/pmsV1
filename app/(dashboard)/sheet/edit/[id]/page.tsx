import SheetTable from '_compo/SheetTable';
import { getSheetByClothId } from '@/data/sheet/data';
import { TSheet } from '@/types/cloth.types';

type TParams = {
  params: {
    id: string;
  };
};

async function getSheet(id: string) {
  const { cloth, count } = await getSheetByClothId(id);
  const list = cloth?.sheet as TSheet[];
  const companyCloth = cloth?.companyCloth;
  return { list, count, companyCloth };
}
async function page({ params }: TParams) {
  const { id } = params;
  const { list, count, companyCloth } = await getSheet(id);
  return (
    <div>
      <SheetTable
        list={list}
        count={count}
        companyCloth={companyCloth}
        editableRow
        deleteRow
      />
    </div>
  );
}

export default page;
