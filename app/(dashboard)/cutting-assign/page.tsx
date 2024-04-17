import CuttingAssignHeader from '../_components/CuttingAssignHeader';
import CuttingAssignList from '../_components/CuttingAssignList';
import SheetHeader from '../_components/SheetHeader';

function page() {
  return (
    <div>
      <CuttingAssignHeader
        totalRecord={0}
        data={{
          id: '',
          companyCloth: '',
          sheet: [],
        }}
      />
      <CuttingAssignList />
    </div>
  );
}

export default page;
