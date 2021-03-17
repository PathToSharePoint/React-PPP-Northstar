import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IPropertyPanePortalProps } from './IPropertyPanePortalProps';
import { PropertyPaneHosts } from './PropertyPaneHostsStore';

export const PropertyPanePortal: React.FunctionComponent<IPropertyPanePortalProps> = (props) => {

    // We'll force a re-render when the hosts are in place
    const [, setPropertyPanePortalRefresh] = React.useState(new Date().toISOString());

    PropertyPaneHosts.forcePropertyPanePortalUpdate = setPropertyPanePortalRefresh;

    const portals = [];

    React.Children.forEach<React.ReactNode>(props.children, (child: React.ReactElement) => {
        if ((child.props["data-Property"])
            && (PropertyPaneHosts.hosts[child.props["data-Property"]] instanceof Element)) {
            portals.push(ReactDOM.createPortal(child, PropertyPaneHosts.hosts[child.props["data-Property"]]));
        }
    });

    return (<>{portals}</>);
};