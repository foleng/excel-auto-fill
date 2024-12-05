import 'handsontable/dist/handsontable.full.min.css';
import { HotTable, HotColumn } from "@handsontable/react";
import { data } from "./constants";

import { addClassesToRows, alignHeaders } from "./hooksCallbacks";

const HandsontableComponent = () => {
  const data = [
    ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 32],
    ['2021', 30, 15, 12, 24],
    ['2022', 40, 20, 22, 23],
  ];

  return (
    <div>
      <h1>Handsontable 在 React 中的示例1</h1>
    <HotTable
      data={data}
      height={450}
      colWidths={[170, 156, 222, 130, 130, 120, 120]}
      colHeaders={[
        "Company name",
        "Country",
        "Name",
        "Sell date",
        "Order ID",
        "In stock",
        "Qty",
      ]}
      dropdownMenu={true}
      hiddenColumns={{
        indicators: true,
      }}
      contextMenu={true}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      autoWrapCol={true}
      autoWrapRow={true}
      afterGetColHeader={alignHeaders}
      // beforeRenderer={addClassesToRows}
      manualRowMove={true}
      licenseKey="non-commercial-and-evaluation"
    >
      <HotColumn data={1} />
      <HotColumn data={2} />
      <HotColumn data={3} />
      <HotColumn data={4} type="date" allowInvalid={false} />
      <HotColumn data={5} />
      <HotColumn data={6} type="checkbox" className="htCenter" />
      <HotColumn data={7} type="numeric" />
    </HotTable>
  );
      {/* <HotTable
        data={data}
        rowHeaders={true}
        colHeaders={true}
        filters={true}
        dropdownMenu={true}
        contextMenu={true}
        licenseKey="non-commercial-and-evaluation" // 用于非商业和评估用途
        width="600"
        height="300"
        manualRowResize={true} // 启用行调整大小
        manualColumnResize={true} // 启用列调整大小
        fillHandle={{ direction: 'vertical' }}
        columnSorting={true}
        autoRowSize={true} // 自动调整行高
                autoColumnSize={true} // 自动调整列宽
                afterSelectionEnd={(row, col) => {
                    console.log(`Selected cell: Row ${row}, Column ${col}`);
                }}
      /> */}
    </div>
  );
};

export default HandsontableComponent;
