import { IPropertyPaneHostsProps } from "../../../PPP/PropertyPaneHostsStore";

export interface ICustomPropertyPaneProps {
    propertyBag: any;
    renderWP: Function;
    propertyPaneHosts: IPropertyPaneHostsProps;
}