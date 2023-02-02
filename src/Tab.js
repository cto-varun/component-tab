import React, { Component } from 'react';
import { Tabs } from 'antd';

import { applyConditionalsToArray } from '../../../../src/services/helpers';

import './styles.css';

const { TabPane } = Tabs;

export default class Tab extends Component {
    componentDidMount() {
        if (this.props.component.params.className) {
            window[window.sessionStorage?.tabId][`${this.props.component.params.className}_activeKey`] = '1';
        }
    }

    componentWillUnmount() {
        if (this.props.component.params.className) {
            delete window[window.sessionStorage?.tabId][`${this.props.component.params.className}_activeKey`];
        }
    }

    render() {
        const { children } = this.props;

        const {
            tabs,
            tabPane,
            styles,
            className,
        } = this.props.component.params;

        const childComponent =
            React.Children &&
            React.Children.map(children, (child) => {
                if (children && children !== false) {
                    return React.cloneElement(child, {
                        parentProps: this.props,
                    });
                }
            });

        const finalTabPanes = applyConditionalsToArray(tabPane);
        function onTabClick(activeKey) {
            if (className) {
                window[window.sessionStorage?.tabId][`${className}_activeKey`] = activeKey;
                if (className === 'crp-payment-tabs') {
                    window[window.sessionStorage?.tabId].setActiveKey && window[window.sessionStorage?.tabId].setActiveKey(activeKey);
                }
            }
        }

        const customDisplayTab = true;

        return (
            <>
                {/* Component Class */}
                {customDisplayTab && (
                    <div>
                        {/* Styles */}
                        <style dangerouslySetInnerHTML={{ __html: styles }} />
                        {/* Tabs */}
                        <Tabs
                            forceRender
                            animated={tabs.animated || false}
                            onTabClick={onTabClick}
                            items={finalTabPanes &&
                                finalTabPanes.map((pane, index) => (
                                    {
                                        label: pane.title,
                                        key: pane.key,
                                        children: childComponent[index],
                                        forceRender,
                                        closable: pane.closable || false
                                    }
                                ))}
                        >
                        </Tabs>
                    </div>
                )}
            </>
        );
    }
}
