import SheetTable from '_compo/SheetTable';
import { getSheetByClothId } from '@/data/sheet/data';
import { TSheet } from '@/types/cloth.types';

async function getSheet(id: string) {
  const data = await getSheetByClothId(id);
  return data?.cloth?.sheet as TSheet[];
}

async function page() {
  // TODO:id tanna ayena
  const list = await getSheet('clu84x7vc0001vva1522m9wcz');
  console.log('list of sheets of bra', list);

  return (
    <div>
      <SheetTable list={list} editableRow deleteRow />
    </div>
  );
}

export default page;
