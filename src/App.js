import CatalogItemLayout from "./CatalogItemLayout";
import React, { useState } from "react";
import { SplitPane } from "react-collapse-pane";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { nativeSelectClasses } from "@mui/material";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const initialItems = [{
  id: 0,
  widgets: [
    { i: "widget1", x: 0, y: 0, w: 2, h: 2 },
    { i: "widget2", x: 2, y: 2, w: 2, h: 2 },
    { i: "widget3", x: 4, y: 4, w: 2, h: 2 },
  ],
  layout: null
}];

function App() {
	const [toolsList, setToolsList] = useState([]);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
  
	const handleAdd = () => {
    const newList = [
      ...toolsList,
			{
				id: toolsList.length + 1,
				widgets: [
					{ i: "widget1", x: 0, y: 0, w: 2, h: 2 },
					{ i: "widget2", x: 2, y: 2, w: 2, h: 2 },
					{ i: "widget3", x: 4, y: 4, w: 2, h: 2 },
				],
        layout: null
			}
		];
		setToolsList(newList);
	};


	return (
		<>
			<div className='App'>
				<Box className="panel-box"
					sx={{
						flexGrow: 1,
						bgcolor: "background.paper",
						display: "flex",
						height: 224,
					}}>
					<Tabs
						orientation='vertical'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs'
						sx={{ borderRight: 1, borderColor: "divider" }}>
						
            {toolsList.map((item, i) => {
              return (
                <Tab key={i} label={'Item No.' + i} {...a11yProps(i)} />
              )
            })}
					</Tabs>
          {toolsList.map((item, i) => {
            return (
              <TabPanel className="tab-panel" key={i} value={value} index={i}>
                <CatalogItemLayout key={i} toolsList={toolsList} idx={i} setToolsList={setToolsList} />
              </TabPanel>
            )
          })}
				</Box>
        <button className="add-item" onClick={(e) => handleAdd()}>Add Item</button>
			</div>
		</>
	);
}

export default App;
