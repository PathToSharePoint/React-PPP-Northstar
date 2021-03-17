import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactPPPNorthstarWebPartStrings';
import ReactPPPNorthstar from './components/ReactPPPNorthstar';
import { IReactPPPNorthstarProps } from './components/IReactPPPNorthstarProps';
import { ICustomPropertyPaneProps } from './components/ICustomPropertyPaneProps';
import { CustomPropertyPane } from './components/CustomPropertyPane';
import { PropertyPaneHost } from '../../PPP/PropertyPaneHost';

export interface IReactPPPNorthstarWebPartProps {
  description: string;
  northstarRadioGroup: string;
  northstarRadioGroupParent: string;
  northstarDropdownChild: string;
  northstarDatepicker: string;
  northstarRadioGroupColor: string;
  northstarSlider: string;
}

export default class ReactPPPNorthstarWebPart extends BaseClientSideWebPart<IReactPPPNorthstarWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactPPPNorthstarProps> = React.createElement(
      ReactPPPNorthstar,
      { ...this.properties }
    );

    const customPropertyPane: React.ReactElement<ICustomPropertyPaneProps> = React.createElement(
      CustomPropertyPane,
      {
        propertyBag: this.properties,
        renderWP: this.render.bind(this)
      }
    );

    ReactDom.render([element, customPropertyPane], this.domElement);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarRadioGroupParent'),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarDropdownChild'),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarDatepicker'),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarRadioGroupColor'),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarSlider'),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarRadioGroup'),
                PropertyPaneHorizontalRule()
              ]
            }
          ]
        }
      ]
    };
  }
}
