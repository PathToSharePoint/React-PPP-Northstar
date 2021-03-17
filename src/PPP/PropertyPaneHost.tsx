import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneCustomFieldProps, IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { PropertyPaneHosts } from './PropertyPaneHostsStore';

export class PropertyPaneHostBuilder implements IPropertyPaneField<IPropertyPaneCustomFieldProps> {

  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneCustomFieldProps;
  private elem!: HTMLElement;

  constructor(targetProperty: string) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: targetProperty,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this)
    };
  }

  public render(): void {
    if (!this.elem) {
      return;
    }
    this.onRender(this.elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    // Update hosts store and force property pane update
    PropertyPaneHosts.updateHost(this.targetProperty, elem);
    PropertyPaneHosts.forcePropertyPanePortalUpdate(new Date().toISOString());
  }
}

export function PropertyPaneHost(targetProperty: string): IPropertyPaneField<IPropertyPaneCustomFieldProps> {
  return new PropertyPaneHostBuilder(targetProperty);
}