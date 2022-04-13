import CatalogItemLayout from "./CatalogItemLayout";
import React, { useState } from "react";
import { SplitPane } from "react-collapse-pane";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

function App() {
	const [toolsList, setToolsList] = useState([]);
	const [currentTool, setCurrentTool] = useState(0);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleAdd = () => {
		setToolsList([
			...toolsList,
			{
				id: toolsList.length + 1,
				widgets: [
					{ i: "widget1", x: 0, y: 0, w: 2, h: 2 },
					{ i: "widget2", x: 2, y: 2, w: 2, h: 2 },
					{ i: "widget3", x: 4, y: 4, w: 2, h: 2 },
				],
			},
		]);
	};


	return (
		<>
			<div className='App'>
				<Box
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
						<Tab label='Item One' {...a11yProps(0)} />
					</Tabs>
					<TabPanel value={value} index={0}>
						Item One
					</TabPanel>
				</Box>
        <button onClick={(e) => handleAdd()}>Add Item</button>
			</div>
		</>
	);
}

export default App;
