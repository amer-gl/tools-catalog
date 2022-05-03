import * as React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const CatalogItemLayout = ({ idx, _layouts, _widgets, updateItem }) => {
  const [layouts, setLayouts] = React.useState({..._layouts});
  const [widgetArray, setWidgetArray] = React.useState([..._widgets]);

  React.useEffect(() : void => {

  }, []);

  const handleModify = (layouts: any[], layout: any) => {
    const tempArray = widgetArray;
    setLayouts(layout);
    layouts?.forEach((position) => {
      tempArray[Number(position.i)].x = position.x;
      tempArray[Number(position.i)].y = position.y;
      tempArray[Number(position.i)].w = position.w;
      tempArray[Number(position.i)].h = position.h;
    });
    setWidgetArray([...tempArray]);
    updateItem({Layouts: layouts, Widgets: widgetArray});
  };

  const handleAdd = () => {
    const tempArray = [
      ...widgetArray,
      { i: "widget" + (widgetArray.length + 1), x: 0, y: 0, w: 2, h: 2 },
    ];
    setWidgetArray([...tempArray]);
    
    updateItem({Layouts: layouts, Widgets: widgetArray});
  };

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice();
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key));
    tempArray.splice(index, 1);
    setWidgetArray([...tempArray]);
    
    updateItem({Layouts: layouts, Widgets: widgetArray});
  };

  return (
    <div>
      <button onClick={() => handleAdd()}>Add Widget</button>

      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact={true}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget, index) => {
          return (
            <div
              className="reactGridItem"
              key={index}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                minW: 1,
                maxW: Infinity,
                minH: 1,
                maxH: Infinity,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <button
                className="deleteButton"
                onClick={() => handleDelete(widget.i)}
              >
                x
              </button>
              <div>{widget.i}</div>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default CatalogItemLayout;
