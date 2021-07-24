import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneHorizontalRule, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactPPPNorthstarWebPartStrings';
import ReactPPPNorthstar from './components/ReactPPPNorthstar';
import { CustomPropertyPane } from './components/CustomPropertyPane';
import { PropertyPaneHost } from '../../PPP/PropertyPaneHost';
import { PropertyPaneHostsFactory, IPropertyPaneHostsProps } from '../../PPP/PropertyPaneHostsStore';

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

    ReactDom.render(
      <>
        {/* Web Part content */}
        <ReactPPPNorthstar {...this.properties} />
        {/* Property Pane custom controls */}
        <CustomPropertyPane
          propertyBag={this.properties}
          renderWP={this.render.bind(this)}
          propertyPaneHosts={this.propertyPaneHosts}
        />
      </>,
      this.domElement);
  }

  // Store for managing the Property Pane hosts
  public propertyPaneHosts: IPropertyPaneHostsProps = PropertyPaneHostsFactory();

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneConfigurationStart() {
    this.propertyPaneHosts[this.instanceId] = false;
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
                PropertyPaneHorizontalRule()
              ]
            },
            {
              groupName: strings.NorthstarGroupName,
              groupFields: [
                // PropertyPaneHost is a generic control that hosts the actual control
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarRadioGroupParent', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarDropdownChild', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarDatepicker', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarRadioGroupColor', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarSlider', this.propertyPaneHosts),
                PropertyPaneHorizontalRule(),
                PropertyPaneHost('northstarRadioGroup', this.propertyPaneHosts),
                PropertyPaneHorizontalRule()
              ]
            }
          ]
        }
      ]
    };
  }
}
