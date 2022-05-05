import * as React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface CatalogItemLayoutProps {
    idx: any;
    layouts: any;
    widgetArray: any[];
    setLayouts: any;
    setWidgetArray: any;
    updateItem: any;
}

const CatalogItemLayout: React.FC<CatalogItemLayoutProps> = ({ idx, layouts, widgetArray, setLayouts, setWidgetArray, updateItem }: CatalogItemLayoutProps) => {

    const handleModify = (layouts: any, layout: any) => {
        const tempArray = widgetArray;
        setLayouts(layout);
        layouts?.forEach((position) => {
            tempArray[Number(position.i)].x = position.x;
            tempArray[Number(position.i)].y = position.y;
            tempArray[Number(position.i)].w = position.w;
            tempArray[Number(position.i)].h = position.h;
        });
        setWidgetArray([...tempArray]);
        updateItem(layouts, widgetArray);
    };

    const handleAdd = () => {
        const tempArray = [
            ...widgetArray,
            { i: "widget" + (widgetArray.length + 1), x: 0, y: 0, w: 2, h: 2 },
        ];
        setWidgetArray([...tempArray]);

        updateItem(layouts, widgetArray);
    };

    const handleDelete = (key) => {
        const tempArray = widgetArray.slice();
        const index = tempArray.indexOf(tempArray.find((data) => data.i === key));
        tempArray.splice(index, 1);
        setWidgetArray([...tempArray]);

        updateItem(layouts, widgetArray);
    };

    return (
        <div>
            <PrimaryButton text="Add Widget" onClick={() => handleAdd()} />

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
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 200ms ease",
                                transitionProperty: "left, top",
                                background: "rgba(0, 132, 255, 0.473)",
                                fontFamily: "Arial, Helvetica, sans-serif",
                                textAlign: "center"
                            }}
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
                                style={{
                                    position: "absolute",
                                    top: "0%",
                                    left: "92%",
                                    background: "transparent",
                                    border: "none",
                                    fontSize: "18px",
                                    cursor: "pointer"
                                }}      
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