import * as React from 'react';

import { PropertyPanePortal } from '../../../PPP/PropertyPanePortal';

import { ICustomPropertyPaneProps } from './ICustomPropertyPaneProps';
import { Provider, teamsTheme, teamsDarkTheme, teamsHighContrastTheme, FormDatepicker, FormSlider, FormDropdown, FormRadioGroup, OneDriveIcon, TeamsIcon, YammerIcon, PowerPointIcon, WordIcon, ExcelIcon } from '@fluentui/react-northstar';

export const CustomPropertyPane: React.FunctionComponent<ICustomPropertyPaneProps> = (props) => {

  // Function to update Web Part properties and re-render the web Part
  function updateWPProperty(p, v) {
    props.propertyBag[p] = v;
    props.renderWP();
  }

  let currentTheme;

  switch (props.propertyBag["northstarRadioGroup"]) {
    case "Light": currentTheme = teamsTheme; break;
    case "Dark": currentTheme = teamsDarkTheme; break;
    case "Contrast": currentTheme = teamsHighContrastTheme; break;
    default: currentTheme = teamsTheme;
  }

  return (
    <Provider theme={currentTheme}>
      <PropertyPanePortal>
        {/* Regular Fluent UI Northstar RadioGroup */}
        <FormRadioGroup
          label="Teams Theme (FormRadioGroup)"
          data-Property="northstarRadioGroup"
          defaultCheckedValue={(props.propertyBag["northstarRadioGroup"]) ? props.propertyBag["northstarRadioGroup"] : "Light"}
          onCheckedValueChange={(e, d) => updateWPProperty("northstarRadioGroup", d.value)}
          items={["Light", "Dark", "Contrast"].map(thm => ({ key: thm, value: thm, name: thm, label: thm }))}
        />
        {/* Regular Fluent UI Northstar Datepicker */}
        <FormDatepicker
          label="Calendar (FormDatepicker)"
          data-Property="northstarDatepicker"
          defaultSelectedDate={(props.propertyBag["northstarDatepicker"]) ? new Date(props.propertyBag["northstarDatepicker"]) : new Date()}
          onDateChange={(e, d) => updateWPProperty("northstarDatepicker", d.value.toISOString().substring(0, 10))}
        />
        {/* Regular Fluent UI Northstar Slider */}
        <FormSlider
          label="Slider (FormSlider)"
          data-Property="northstarSlider"
          defaultValue={props.propertyBag["northstarSlider"] || 100}
          fluid
          onChange={(e, d) => updateWPProperty("northstarSlider", d.value)}
        />
        {/* Regular Fluent UI Northstar RadioGroup */}
        <FormRadioGroup
          label="Color Picker (FormRadioGroup)"
          data-Property="northstarRadioGroupColor"
          defaultCheckedValue="pink"
          items={['pink', 'blue', 'green', 'red', 'orange'].map(color => ({
            key: color, value: color, name: color, 'aria-label': color,
            variables: { indicatorColorDefault: color, indicatorBackgroundColorChecked: color, indicatorBorderColorDefaultHover: color },
          }))}
          onCheckedValueChange={(e, p) => updateWPProperty("northstarRadioGroupColor", p.value)}
        />
        <FormRadioGroup
          label="Parent Selection (FormRadioGroup)"
          data-Property="northstarRadioGroupParent"
          defaultCheckedValue={(props.propertyBag["northstarRadioGroupParent"]) ? props.propertyBag["northstarRadioGroupParent"] : null}
          onCheckedValueChange={(e, d) => updateWPProperty("northstarRadioGroupParent", d.value)}
          items={["Office", "M365"].map(thm => ({ key: thm, value: thm, name: thm, label: thm }))}
        />
        <FormDropdown
          label="Child Selection (FormDropdown)"
          data-Property="northstarDropdownChild"
          placeholder="Pick an App..."
          fluid
          onChange={(e, d) => updateWPProperty("northstarDropdownChild", d.value["header"])}
          items={[
            { header: "Teams", key: 'Teams', image: { as: TeamsIcon }, parent: "M365" },
            { header: "OneDrive", key: 'OneDrive', image: { as: OneDriveIcon }, parent: "M365" },
            { header: "Yammer", key: 'Yammer', image: { as: YammerIcon }, parent: "M365" },
            { header: "Excel", key: 'Excel', image: { as: ExcelIcon }, parent: "Office" },
            { header: "PowerPoint", key: 'PowerPoint', image: { as: PowerPointIcon }, parent: "Office" },
            { header: "Word", key: 'Word', image: { as: WordIcon }, parent: "Office" }
          ].filter(i => i.parent == props.propertyBag["northstarRadioGroupParent"])}
        />
      </PropertyPanePortal>
    </Provider>
  );
};