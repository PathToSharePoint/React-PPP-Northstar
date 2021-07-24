import * as React from 'react';
import styles from './ReactPPPNorthstar.module.scss';
import { IReactPPPNorthstarProps } from './IReactPPPNorthstarProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactPPPNorthstar extends React.Component<IReactPPPNorthstarProps, {}> {
  public render(): React.ReactElement<IReactPPPNorthstarProps> {
    return (
      <div className={ styles.reactPppNorthstar }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Property Pane Portal</span>
              <p className={ styles.subTitle }>Use any form control in the Property Pane.</p>
              <p className={styles.description}>Parent Selection: {escape(this.props.northstarRadioGroupParent || "")}</p>
              <p className={styles.description}>Child Selection: {escape(this.props.northstarDropdownChild || "")}</p>
              <p className={styles.description}>Northstar Datepicker: {escape(this.props.northstarDatepicker || "")}</p>
              <p className={styles.description}>Northstar Colorpicker: {escape(this.props.northstarRadioGroupColor || "")}</p>
              <p className={styles.description}>Northstar Slider: {escape((this.props.northstarSlider || "").toString())}</p>
              <a href="https://fluentsite.z22.web.core.windows.net/" className={ styles.button }>
                <span className={ styles.label }>Visit Fluent UI Northstar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
