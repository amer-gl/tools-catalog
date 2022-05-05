import * as React from 'react';
import styles from './ToolsCatalog.module.scss';
import { IToolsCatalogProps } from './IToolsCatalogProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { sp, Web, IWeb } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import CatalogItemLayout from './CatalogItemLayout';

export interface IState {
  ID: number;
  Item: any;
  status: string;
}


export default class ToolsCatalog extends React.Component<IToolsCatalogProps, IState> {
  
  constructor(props: IToolsCatalogProps | Readonly<IToolsCatalogProps>) {
    super(props);
    this.state = {
      ID: props.targetTool || 0,
      Item: {},
      status: "load"
    };
    this.setLayouts = this.setLayouts.bind(this);
    this.setWidgetArray = this.setWidgetArray.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  public async componentDidMount() {
    await this.fetchData();
  }

  public async componentDidUpdate(prevProps) {
    if(prevProps.targetTool != this.props.targetTool || 
      this.props.targetTool != this.state.ID
      ) {
        await this.setState({ID: this.props.targetTool});
        await this.fetchData();
      }
    }

    public async setLayouts(_layouts) {
      await this.setState({
        Item: {
          ...this.state.Item,
          Layouts: _layouts
        }
      });
    }
    
    public async setWidgetArray(_widgets) {
      await this.setState({
        Item: {
          ...this.state.Item,
          Widgets: _widgets
        }
      });
    }
    

    public async fetchData() {
      let web = Web(this.props.webURL);
      const item: any = await web.lists.getByTitle("Tools").items.getById(this.state.ID).select("*").get();
      this.setState({ Item: {
          ...item,
          Layouts: JSON.parse(item.Layouts),
          Widgets: JSON.parse(item.Widgets),
        },
        status: "done"
      });
      console.log(this.state);
      // debugger
    }

    public async updateData(_layouts, _widgets) {
      let web = Web(this.props.webURL);
      const item: any = await web.lists.getByTitle("Tools").items.getById(this.state.ID).update({
        Layouts: JSON.stringify(_layouts),
        Widgets: JSON.stringify(_widgets),
      }).then(i => console.log(i));
      console.log("Updating with", _layouts, _widgets);
    }

    public render(): React.ReactElement<IToolsCatalogProps> {
      const {
      targetTool,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      context
    } = this.props;

    return (
      <section className={`${styles.toolsCatalog} ${hasTeamsContext ? styles.teams : ''}`}>
        {this.state.Item.Title}
        {this.state.status !== "load" &&
        <CatalogItemLayout idx={this.state.ID} layouts={this.state.Item.Layouts} widgetArray={this.state.Item.Widgets} setLayouts={this.setLayouts} setWidgetArray={this.setWidgetArray} updateItem={this.updateData} />
        }
      </section>
    );
  }
}
