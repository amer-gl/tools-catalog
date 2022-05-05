declare interface IToolsCatalogWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TargetToolFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'ToolsCatalogWebPartStrings' {
  const strings: IToolsCatalogWebPartStrings;
  export = strings;
}
