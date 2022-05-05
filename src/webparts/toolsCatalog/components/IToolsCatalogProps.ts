import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IToolsCatalogProps {
  targetTool: number;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  webURL:string;
}
