export interface IPropertyPaneHostsProps {
    hosts: Record<string,HTMLElement>;
    updateHost: Function;
    forcePropertyPanePortalUpdate: Function;
}

function PropertyPaneHostsFactory()  {
    let hosts: Record<string,HTMLElement> = {};
    const updateHost = (targetProperty: string, hostElement: HTMLElement) => hosts[targetProperty] = hostElement;

    // Placeholder for Property Pane force update hook
    const forcePropertyPanePortalUpdate = () => {};

    return {hosts, updateHost,forcePropertyPanePortalUpdate};
}

export const PropertyPaneHosts: IPropertyPaneHostsProps = PropertyPaneHostsFactory();