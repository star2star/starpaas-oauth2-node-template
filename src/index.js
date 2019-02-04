import React from 'react';
import { Utilities } from 's2s-app-service';
import ObjectMerge from 'object-merge';
import Input from 's2s-input';
import Select from 's2s-select';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as svgIcons from 's2s-svg-icons';
import { colorGrid } from 's2s-themes';
import { Arrow, Rect, Path, Circle, Text, Line, Group, Wedge } from "react-konva";
import * as nodeUtilities from 's2s-node-utilities';
import Button from 's2s-button';

const name = "oauth2 Example";
const type = "auth2example";
const description = "Test description";
const componentName = "OAuth2Example";
const category = "activity";

const MAX_TIMEOUT = 300000;

// does this node need to have a token .... defaults to true 
const NEEDS_TOKEN = true;

const StyledButton = styled(Button)`
  text-transform : uppercase;
`;

const nodeInfo = {
  "name": name,
  "description": description,
  "type": type,
  "componentName": componentName,
  "componentType": "node",
  "svg": "CheckFilledIconSVG", //change SVG appropriately 
  "svgFillColor": colorGrid.gray0,
  "svgBackgroundColor": colorGrid.cyan8,
  "category": category
};

const definitions = {
  "nextState": {
    "type": "string",
    "enum": [
      "A", "B", "C"
    ]
  },
  "oAuth2Credentials": {
    "type": "string",
    "enum": [
      "a", "b", "c"
    ],
    "enumNames": ["A", "B", "C"]
  }
};

const defaultFormData = {
  formData: {
    "name": name,
    "description": description,
    "oAuth2CredsUUID": "",
    "nextState": "",
    "onError": "",
    "onTimeout": "",
    "timeout": "0",
    "resultPath": ""
  },
  "definitions": definitions
};

const renderNodeIcon = (dynamicSVG, dynamicSVGFill) => {
  // console.log('NODE ICON', dynamicSVG, svgIcons[dynamicSVG].shape);
  let returnElement;
  let index = 0;
  if (dynamicSVG && svgIcons.hasOwnProperty(dynamicSVG) && svgIcons[dynamicSVG].shape) {
    // render based on svg.shape
    returnElement = Object.keys(svgIcons[dynamicSVG].shape).map((shapeKey) => {
      // console.log('svgIcons[dynamicSVG].shape....', svgIcons[dynamicSVG].shape, shapeKey);
      let newShape = svgIcons[dynamicSVG].shape[shapeKey];
      if (!Array.isArray(newShape)) {
        newShape = [].concat(newShape);
      }

      return newShape.map((i) => {
        // console.log('xxxxx', i, shapeKey);
        switch (shapeKey) {
          case "path":
            if (i.hasOwnProperty('d')) {
              //console.log('offsets.....', offsets);
              return (<Path data={i.d}
                offsetX={-16}
                offsetY={-16}
                key={index++}
                fill={dynamicSVGFill}
                scale={{ x: 0.75, y: 0.75 }}
              />);
            } else {
              return (<Path data={i}
                offsetX={-16}
                offsetY={-16}
                key={index++}
                fill={dynamicSVGFill}
                scale={{ x: 0.75, y: 0.75 }} />);
            }
          case "rect":
            return (<Rect height={Number(i.height)} width={Number(i.width)} offsetX={-16} offsetY={-16} cornerRadius={Number(i.rx)} key={index++} fill={dynamicSVGFill} />);
          case "circle":
            return (<Circle offsetX={i.cx * -1.5} offsetY={i.cy - 40} radius={new Number(i.r)} key={index++} fill={dynamicSVGFill} />);
          default:
            console.log('shape key not supported: ' + shapeKey);
        }
      });
    });
  } else {
    returnElement = (
      <Rect
        height={12}
        width={12}
        offsetX={-18}
        offsetY={-18}
        fill={dynamicSVGFill}
        cornerRadius={3}
      />
    );
  }
  return returnElement;
};

const renderErrorSVG = (svg) => {
  let returnElement;
  let index = 0;

  if (svg && svgIcons.hasOwnProperty(svg) && svgIcons[svg].shape) {
    // render based on svg.shape
    returnElement = Object.keys(svgIcons[svg].shape).map((shapeKey) => {
      const NameOfKonva = shapeKey.charAt(0).toUpperCase() + shapeKey.substr(1);
      return svgIcons[svg].shape[shapeKey].map((i) => {
        //console.log('xxxxx', i);
        switch (shapeKey) {
          case "path":
            if (i.hasOwnProperty('d')) {
              //console.log('offsets.....', offsets);
              return (<NameOfKonva data={i.d}
                offsetX={Math.floor(-286 * 1.33)}
                offsetY={Math.floor(-57 * 1.33)}
                key={index++}
                fill={colorGrid.gray0}
                scale={{ x: 0.75, y: 0.75 }
                } />);
            } else {
              return (<NameOfKonva data={i} offsetX={-8} offsetY={-8} key={index++} fill={colorGrid.gray0} scale={{ x: 0.75, y: 0.75 }
              } />);
            }

          case "rect":
            return (<NameOfKonva height={Number(i.height)} width={Number(i.width)}
              offsetX={Math.floor(-297 * 1.33)}
              offsetY={Math.floor(-68 * 1.33)}
              cornerRadius={Number(i.rx)} key={index++} fill={colorGrid.gray0} scale={{ x: 0.75, y: 0.75 }} />);
          case "circle":
            return (<NameOfKonva
              offsetX={Math.floor(-298 * 1.33)}
              offsetY={Math.floor(-75 * 1.33)}
              radius={new Number(i.r)} key={index++} fill={colorGrid.gray0} scale={{ x: 0.75, y: 0.75 }} />);
          default:
            console.log('shape key not supported: ' + shapeKey);
        }
      });
    });
  } else {
    returnElement = (
      <Rect
        height={16}
        width={16}
        offsetX={-16}
        offsetY={-16}
        fill={colorGrid.gray0}
        cornerRadius={3}
      />
    );
  }
  return returnElement;
};

const renderErrorDetails = (messages, showErrorDetails) => {
  if (messages.length > 0 && showErrorDetails) {
    // adjust height based on how many messages to show...
    const height = 64 * messages.length;
    const fill = colorGrid.gray0;

    return (
      <React.Fragment>
        <Rect
          height={height}
          width={248}
          offsetX={-350}
          offsetY={(height / 2) - 68}
          fill={fill}
          stroke={colorGrid.gray3}
          cornerRadius={4}
          shadowColor={colorGrid.gray5}
          shadowOffset={{ x: 5, y: 5 }}
          shadowBlur={100}
        />
        <Wedge
          x={340}
          y={68}
          radius={16}
          fill={fill}
          angle={60}
          rotation={-30}
          stroke={colorGrid.gray3}
        />
        <Rect
          height={16}
          width={8}
          offsetX={-351}
          offsetY={-60}
          fill={fill}
        />
        {messages.map((msg, index) => {
          return (
            <React.Fragment key={msg.displayTitle}>
              <Text
                offsetX={-368}
                offsetY={((height / 2) - 80) - (64 * index)}
                text={msg.displayTitle}
                fill={colorGrid.gray9}
                fontSize={14}
                fontStyle="bold"
              />
              <Text
                offsetX={-368}
                offsetY={((height / 2) - 104) - (64 * index)}
                text={msg.message}
                fill={colorGrid.gray9}
                fontSize={14}
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  } else {
    return undefined;
  }
};

const renderErrorArea = (compValid, svg, node, nodeAction, showErrorDetails) => {
  if (compValid.isValid === false) {
    return (
      <Group
        onMouseEnter={(e) => { /*console.log('Error area hover!', e, compValid.messages, node);*/ nodeAction('mouseEnterError', { "nodeUUID": node.uuid, "event": e }); }}
        onMouseLeave={(e) => { /*console.log('Error leaving.....');*/ nodeAction('mouseLeaveError', { "event": e }); }}
      >
        <Rect
          height={32}
          width={56}
          offsetX={-280}
          offsetY={-54}
          fill={colorGrid.red7}
          cornerRadius={32}
        />
        <Text
          offsetX={-318}
          offsetY={-63}
          text={compValid.messages.length}
          fill={colorGrid.gray0}
          fontSize={14}
          fontStyle="bold"
        />
        {renderErrorSVG(svg)}
        {renderErrorDetails(compValid.messages, showErrorDetails)}

      </Group>
    );
  } else {
    return undefined;
  }
};

const getConfigTab = (data, errors, callback) => {
  return () => {
    // render jsx here 
    return (
      <React.Fragment>
        <FormSection
          className="NodeInformationSection"
          sectionHeader={Utilities.getInstance().getIntlMessage('END-NODE-FORM-NODE-INFORMATION-HEADER', "Node Information")}
          sectionDescription={Utilities.getInstance().getIntlMessage('END-NODE-FORM-NODE-INFORMATION-DESCRIPTION', "Basic node information")}
        >
          <StyledInput
            inputLabel={Utilities.getInstance().getIntlMessage('END-NODE-FORM-DISPLAY-NAME-LABEL', "Display Name")}
            inputHint={Utilities.getInstance().getIntlMessage('END-NODE-FORM-DISPLAY-NAME-HINT', "This name will display on the node")}
            inputType={"text"}
            placeholder={Utilities.getInstance().getIntlMessage('END-NODE-FORM-DISPLAY-NAME-PLACEHOLDER', "Enter display name...")}
            value={data.name}
            hasSVG={false}
            cbOnChange={(data) => {
              callback && callback("update", { "field": "name", "value": data });
            }}
            errorText={errors && errors.hasOwnProperty("name") ? errors["name"] : ""}
            hasError={errors && errors.hasOwnProperty('name')}
          />
          <StyledInput
            inputLabel={Utilities.getInstance().getIntlMessage('END-NODE-FORM-NOTE-LABEL', "Note")}
            inputHint={Utilities.getInstance().getIntlMessage('END-NODE-FORM-NOTE-HINT', "Enter in a note for this node.")}
            placeholder={Utilities.getInstance().getIntlMessage('END-NODE-FORM-NOTE-PLACEHOLDER', "Enter a note...")}
            value={data.description}
            hasSVG={false}
            cbOnChange={(data) => {
              callback && callback("update", { "field": "description", "value": data });
            }}
            errorText={errors && errors.hasOwnProperty("description") ? errors["description"] : ""}
            hasError={errors && errors.hasOwnProperty('description')}
          />
        </FormSection>

        <FormSection
          className="NodeInformationSection"
          sectionHeader={Utilities.getInstance().getIntlMessage('OAUTH-EXAMPLE-NODE-HEADER', "OAuth2")}
          sectionDescription={Utilities.getInstance().getIntlMessage('OAUTH-EXAMPLE-NODE-DESCRIPTION', "Some oAuth Description")}
        >
          <StyledSelect
            //selectLabel={""}
            selectedItem={data.oAuth2CredsUUID}
            property="value"
            autoFocus={false}
            cbOnValueChange={(source) => {
              callback && callback("update", { "field": "oAuth2CredsUUID", "value": source.value });
            }}
            //cbOnBlur={this.handleValueChanged}
            menuItems={data.definitions.oAuth2Credentials.enum.map((i, index) => {
              return { "label": data.definitions.oAuth2Credentials.enumNames[index], "value": i };
            })}
            placeholder="Please select"
            errorText={errors && errors.hasOwnProperty("oAuth2CredsUUID") ? errors["oAuth2CredsUUID"] : ""}
            hasError={errors && errors.hasOwnProperty('oAuth2CredsUUID')}
          />
          <StyledButton
            className="NewOauth2Button"
            ariaLabel="New OAuth2"
            buttonLabel="New OAuth2"
            buttonSize="large"
            buttonType="primaryGreen"
            cbClick={
              (event) => {
                //show dialag first 
                callback && callback("new-oauth2", { "scopes": ['profile', 'email', "https://www.googleapis.com/auth/drive.readonly"], "name": 'New Demo Name', "provider": "google", "description": "does something" });
              }}
          />
        </FormSection>

        <FormSection
          className="ConfigureDataSection"
          hideDivider
          sectionHeader={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-CONFIGURE-DATA-HEADER', "Configure Data")}
          sectionDescription={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-CONFIGURE-DATA-DESCRIPTION', "Specify the data source name for the node.")}
        >
          <StyledInput
            inputLabel={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-NODE-OUTPUT-TARGET-LABEL', "Output target")}
            placeholder={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-NODE-OUTPUT-TARGET-PLACEHOLDER', "Select your response location...")}
            value={data.resultPath}
            hasSVG={false}
            cbOnChange={(data) => {
              callback && callback("update", { "field": "resultPath", "value": data });
            }}
            errorText={errors && errors.hasOwnProperty("resultPath") ? errors["resultPath"] : ""}
            hasError={errors && errors.hasOwnProperty('resultPath')}
          />
        </FormSection>
      </React.Fragment>
    );
  };
};

const getOutputTab = (data, errors, callback) => {
  return () => {
    // render jsx here 
    return (
      <React.Fragment>
        <FormSection
          className="OutputDestinationSection"
          hideDivider
          sectionHeader={Utilities.getInstance().getIntlMessage('SEND-EMAIL-NODE-FORM-OUTPUT-DESTINATION-LABEL', "Output Connections")}
          sectionDescription={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-OUTPUT-DESTINATION-DESCRIPTION', "Specify the destination of this node's output.")}
        >

          <Label>{Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-SUCCESS-DESTINATION-LABEL', "Success Connection")}</Label>
          <StyledSelect
            //sselectLabel={"Next"}
            className="ttttt"
            selectedItem={data.nextState}
            property="value"
            autoFocus={false}
            cbOnValueChange={(source) => {
              //console.log('xxxxxx', source);
              callback && callback("update", { "field": "nextState", "value": source.value });
            }}
            //cbOnBlur={this.handleValueChanged}
            menuItems={data.definitions.nextState.enum.map((i) => {
              return { "label": i, "value": i };
            })}
            placeholder="Please select"
            errorText={errors && errors.hasOwnProperty("nextState") ? errors["nextState"] : ""}
            hasError={errors && errors.hasOwnProperty('nextState')}
          />

          <Label>{Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-ERROR-DESTINATION-LABEL', "Error Connection")}</Label>
          <StyledSelect
            selectedItem={data.onError}
            property="value"
            autoFocus={false}
            cbOnValueChange={(source) => {
              //console.log('xxxxxx', source);
              callback && callback("update", { "field": "onError", "value": source.value });
            }}
            menuItems={data.definitions.nextState.enum.map((i) => {
              return { "label": i, "value": i };
            })}
            placeholder="Please select"
            errorText={errors && errors.hasOwnProperty("onError") ? errors["onError"] : ""}
            hasError={errors && errors.hasOwnProperty('onError')}
          />
          <TimeoutArea>
            <TimeoutInput
              inputLabel={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-TIMEOUT-LABEL', "Timeout")}
              placeholder={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-TIMEOUT-PLACEHOLDER', "Default: 2000")}
              value={data.timeout + ""} //integer needed string
              hasSVG={false}
              cbOnChange={(data) => {
                callback && callback("update", { "field": "timeout", "value": data });
              }}
              errorText={errors && errors.hasOwnProperty("timeout") ? errors["timeout"] : ""}
              hasError={errors && errors.hasOwnProperty('timeout')}
            />
            <TimeoutDesinationSelect
              selectLabel={Utilities.getInstance().getIntlMessage('SEND-SMS-NODE-FORM-TIMEOUT-DESTINATION-LABEL', "Timeout Connection")}
              selectedItem={data.onTimeout}
              property="value"
              autoFocus={false}
              cbOnValueChange={(source) => {
                //console.log('xxxxxx', source);
                callback && callback("update", { "field": "onTimeout", "value": source.value });
              }}
              //cbOnBlur={this.handleValueChanged}
              menuItems={data.definitions.nextState.enum.map((i) => {
                return { "label": i, "value": i };
              })}
              placeholder="Please select"
              errorText={errors && errors.hasOwnProperty("onTimeout") ? errors["onTimeout"] : ""}
              hasError={errors && errors.hasOwnProperty('onTimeout')}
            />
          </TimeoutArea>
        </FormSection>
      </React.Fragment>
    );
  };
};

const isValid = (data, otherNodes) => {
  // name and length are required 
  let bReturn = true;
  let msgReturn = [];
  if (!data.name || data.name.length < 1) {
    bReturn = false;
    msgReturn = msgReturn.concat({ "field": "name", "displayTitle": "Name", "message": `missing name` });
  }
  //nextState
  if (!data.nextState || data.nextState.length < 1) {
    bReturn = false;
    msgReturn = msgReturn.concat({ "field": "nextState", "displayTitle": "Success Connection", "message": `missing` });
  } else {
    // validate whenTrue name is in otherNodes
    const foundNodes = otherNodes.filter((n) => {
      return n.formData.name === data.nextState;
    });
    if (foundNodes.length < 1) {
      bReturn = false;
      msgReturn = msgReturn.concat({ "field": "nextState", "displayTitle": "Success Connection", "message": `Success Connection is invalid` });
    }
  }
  // console.log('dddddd', data);
  if (!data.timeout || !data.timeout.match(/^\d+$/g) || data.timeout < 0 || data.timeout > MAX_TIMEOUT) {
    bReturn = false;
    msgReturn = msgReturn.concat({ "field": "timeout", "displayTitle": "Timeout", "message": `timeout time is invalid` });
  }
  
  if (!data.oAuth2CredsUUID || data.oAuth2CredsUUID.length < 5) {
    bReturn = false;
    msgReturn = msgReturn.concat({ "field": "oAuth2CredsUUID", "displayTitle": "oAuth Credentials", "message": `missing or invalid  oAuth Credentials` });
  }
  return { "isValid": bReturn, "messages": msgReturn };
};

const publish = (/* flow, nodeData */) => {
  return new Promise((resolve) => {
    //custom code here 
    // if (1 === 2) {
    //   reject();
    // }
    resolve();
  });
};

const unPublish = (/* flow, nodeData */) => {
  return new Promise((resolve) => {
    //custom code here 
    // if ('x' === "y") {
    //   reject();
    // }
    resolve();
  });
};

const needsToken = () =>{
  return NEEDS_TOKEN;
};


export default {
  "generateSampleData": (/*nodeData, globalData*/) => {
    // start node so i am not doing much ... just return parameters 
    const returnObject = {};
    return new Promise((resolve) => {
      resolve(returnObject);
    });
  },

  "defaultFormData": defaultFormData,

  "definitions": definitions,

  "nodeInfo": nodeInfo,

  "isValid": isValid,

  "needsToken": needsToken, 

  "generateWorkflow": (data) => {
    let TransitionCounter = 0;
    // decomposing ... only getting what i need
    // building new state object 
    const newState = { "name": data.name, "description": data.description, "type": "normal" };
    // setting new uuid 
    newState.uuid = Utilities.getInstance().generateUUID();
    const newTransition = {
      "condition": {
        "type": "lambda",
        "data": {
          "lambda_condition": {
            "function_name": "oauth2example",
            "blocking": true,
            "parameters": {
              "token": "$token",
              "oauth2_uuid": data.oAuth2CredsUUID
            }
          }
        }
      },
      "description": `Transition for ${data.name}`,
      "name": `T-${data.name}-${TransitionCounter++}`,
      "next_error_state": `${data.onError ? data.onError : data.nextState}`,
      "next_state": `${data.nextState}`,
      "next_timeout_state": `${data.onTimeout ? data.onTimeout : data.nextState}`,
      "start_state": `${data.name}`,
      "timeout": data.timeout,
      "uuid": Utilities.getInstance().generateUUID()
    };
    if (data.resultPath && data.resultPath.length > 0) {
      newTransition.condition.data.lambda_condition.result_path = "$" + data.resultPath;
    }
    // returning new object 
    return { states: [].concat(newState), transitions: [].concat(newTransition) };
  },

  "generateJSXNode": (flow, node, index, position, nodeAction, clickAction, moveAction, canvasSize, showErrorDetails) => {
    // console.log('generateJSXNode ', node);
    return (
      <Group key={node.uuid}
        draggable
        nodeUUID={node.uuid}
        onMouseEnter={(e) => {
          //console.log('mouse enter');
          nodeAction("mouseEnter", e);
        }}
        onMouseLeave={(e) => {
          //console.log('mouse leave');
          nodeAction("mouseLeave", e);
        }}
        onDragStart={(e) => {
          nodeAction("dragStart", e);
        }}
        onDragEnd={(e) => {
          if (nodeAction && typeof (nodeAction) === "function") {
            nodeAction("updateLocation", { "nodeUUID": node.uuid, "x": e.target.attrs.x, "y": e.target.attrs.y, "event": e });
          }
          if (clickAction && typeof (clickAction) === "function") {
            clickAction("nodes-edit", node.uuid);
          }
        }}
        x={position.x}
        y={position.y}
        onClick={(e) => {
          nodeAction('selectedNode', e);
          if (clickAction && typeof (clickAction) === "function") {
            clickAction("nodes-edit", node.uuid);
          }
        }}
        onDragMove={(e) => {
          if (moveAction && typeof (moveAction) === "function") {
            const points = e.target.getClientRect();
            moveAction(node.uuid, points);
          }
        }}
        dragBoundFunc={(pos) => {
          const newPos = ObjectMerge({}, pos);
          if (newPos.x < 10) {
            newPos.x = 10;
          } else if (newPos.x > canvasSize.width - 300) {
            newPos.x = canvasSize.width - 300;
          }
          if (newPos.y < 10) {
            newPos.y = 10;
          } else if (newPos.y > canvasSize.height - 50) {
            newPos.y = canvasSize.height - 50;
          }

          return newPos;
        }}
      >
        <Rect
          offsetX={2}
          offsetY={2}
          mainRect
          width={304}
          height={96}
          cornerRadius={10}
        />
        <Rect
          width={300}
          height={88}
          fill={colorGrid.cyan1}
          cornerRadius={8}
        />
        <Circle
          height={32}
          width={32}
          offsetX={-24}
          offsetY={-24}
          fill={colorGrid.cyan8}
        />
        {renderNodeIcon(nodeInfo.svg, nodeInfo.svgFillColor)}
        <Group>
          <Text
            offsetX={-46}
            offsetY={-16}
            text={node.formData.name.toUpperCase()}
            fill={nodeInfo.svgBackgroundColor}
            fontSize={14}
            fontStyle="bold"
          />
        </Group>
        <Group>
          <Rect
            width={300}
            height={40}
            fill={colorGrid.gray0}
            offsetX={0}
            offsetY={-50}
            cornerRadius={8}
          />
          <Rect
            width={300}
            height={10}
            fill={colorGrid.gray0}
            offsetX={0}
            offsetY={-50}
          />
          <Text
            offsetX={-16}
            offsetY={-60}
            text="ERROR"
            fill={colorGrid.gray9}
            fontSize={14}
            width={51}
          />
          <Line
            stroke={colorGrid.gray3}
            points={[83, 50, 83, 92]}
            strokeWidth={1}
          />
          <Text
            offsetX={-99}
            offsetY={-60}
            text="TIMEOUT"
            fill={colorGrid.gray9}
            fontSize={14}
            width={63}
          />
          <Line
            stroke={colorGrid.gray3}
            points={[178, 50, 178, 92]}
            strokeWidth={1}
          />
          <Text
            offsetX={-194}
            offsetY={-60}
            text="SUCCESS"
            fill={colorGrid.gray9}
            fontSize={14}
            width={68}
          />
          <Line
            stroke={colorGrid.gray3}
            points={[278, 50, 278, 92]}
            strokeWidth={1}
          />
        </Group>
        {renderErrorArea(isValid(node.formData, flow.nodes), "AlertIconSVG", node, nodeAction, showErrorDetails)}
      </Group>
    );
  },

  "generateConnectors": (flow, node, index, position, handleConnectorEnd, connectorPosition) => {
    //console.log('xxxx', position, connectorPosition);
    const getConnectorPosition = (aField) => {
      if (connectorPosition && connectorPosition.field === aField) {
        return connectorPosition;
      }
      return undefined;
    };

    return (
      <Group key={index}>
        {nodeUtilities.renderConnectorCircles(-41.5, "onError", true, undefined, position, handleConnectorEnd, node.uuid, getConnectorPosition("onError"))}
        {nodeUtilities.renderConnectorCircles(-130.5, "onTimeout", true, undefined, position, handleConnectorEnd, node.uuid, getConnectorPosition("onTimeout"))}
        {nodeUtilities.renderConnectorCircles(-228, "nextState", true, undefined, position, handleConnectorEnd, node.uuid, getConnectorPosition("nextState"))}
      </Group>
    );
  },


  "generateArrows": (flow, node, index, nodePositions, connectorPosition) => {
    let returnArrows = [];
    let keyIndex = 0;
    //start only has one connection 
    //console.log('>>>>', flow, node, index, nodePositions, connectorPosition);

    // check nextState
    if (node.formData.nextState && node.formData.nextState.length > 0) {
      const connectedNode = nodeUtilities.getNodeByName(flow.nodes, node.formData.nextState);
      //console.log('connected node is: ', connectedNode);
      const startX = nodePositions[node.uuid].x + 228;
      const startY = nodePositions[node.uuid].y + 88;
      const endX = connectedNode && connectedNode.hasOwnProperty('position') && connectedNode.position.hasOwnProperty('width') ?
        connectedNode && nodePositions[connectedNode.uuid].x + connectedNode.position.width / 2 : // half of node width if available
        connectedNode && nodePositions[connectedNode.uuid].x + 150; // NOTE: 180 is half the standard width of nodes other than start and end
      const endY = connectedNode && nodePositions[connectedNode.uuid].y;
      const points = connectedNode && nodeUtilities.getArrowPoints(nodePositions[node.uuid], nodePositions[connectedNode.uuid], startX, startY, endX, endY);
      returnArrows = returnArrows.concat(<Arrow points={points} stroke={"black"} fill={"black"} key={node.formData.name + keyIndex++} />);
    }

    // check onError 
    if (node.formData.onError && node.formData.onError.length > 0) {
      const connectedNode = nodeUtilities.getNodeByName(flow.nodes, node.formData.onError);
      //console.log('connected node is: ', connectedNode);
      const startX = nodePositions[node.uuid].x + 41;
      const startY = nodePositions[node.uuid].y + 88;
      const endX = connectedNode && connectedNode.hasOwnProperty('position') && connectedNode.position.hasOwnProperty('width') ?
        connectedNode && nodePositions[connectedNode.uuid].x + connectedNode.position.width / 2 : // half of node width if available
        connectedNode && nodePositions[connectedNode.uuid].x + 150; // NOTE: 180 is half the standard width of nodes other than start and end
      const endY = connectedNode && nodePositions[connectedNode.uuid].y;
      const points = connectedNode && nodeUtilities.getArrowPoints(nodePositions[node.uuid], nodePositions[connectedNode.uuid], startX, startY, endX, endY);
      returnArrows = returnArrows.concat(<Arrow points={points} stroke={"black"} fill={"black"} key={node.formData.name + keyIndex++} />);
    }
    // check onTimeout
    if (node.formData.onTimeout && node.formData.onTimeout.length > 0) {
      const connectedNode = nodeUtilities.getNodeByName(flow.nodes, node.formData.onTimeout);
      //console.log('connected node is: ', connectedNode);
      const startX = nodePositions[node.uuid].x + 130;
      const startY = nodePositions[node.uuid].y + 88;
      const endX = connectedNode && connectedNode.hasOwnProperty('position') && connectedNode.position.hasOwnProperty('width') ?
        connectedNode && nodePositions[connectedNode.uuid].x + connectedNode.position.width / 2 : // half of node width if available
        connectedNode && nodePositions[connectedNode.uuid].x + 150; // NOTE: 180 is half the standard width of nodes other than start and end
      const endY = connectedNode && nodePositions[connectedNode.uuid].y;
      const points = connectedNode && nodeUtilities.getArrowPoints(nodePositions[node.uuid], nodePositions[connectedNode.uuid], startX, startY, endX, endY);
      returnArrows = returnArrows.concat(<Arrow points={points} stroke={"black"} fill={"black"} key={node.formData.name + keyIndex++} />);
    }

    if (connectorPosition) {
      // need to draw that arrow 
      let offset = 228;
      switch (connectorPosition.field) {
        case "onError":
          offset = 41;
          break;
        case "onTimeout":
          offset = 130;
          break;
        case "nextState":
          offset = 228;
          break;
      }
      const startX = nodePositions[node.uuid].x + offset;
      const startY = nodePositions[node.uuid].y + 88;
      const endX = connectorPosition.x;
      const endY = connectorPosition.y;
      const points = nodeUtilities.getArrowPoints(nodePositions[node.uuid], undefined, startX, startY, endX, endY);
      returnArrows = returnArrows.concat(<Arrow points={points} stroke={"black"} fill={"black"} key={node.formData.name + keyIndex++} />);

    }
    return returnArrows;
  },

  "generateNewNode": () => {
    return { ...nodeInfo, ...defaultFormData, "position": { "width": 300, "height": 88 } };
  },

  "getHeaderText": () => {
    return Utilities.getInstance().getIntlMessage("CONFIRMATION-NODE-HEADER-TITLE", "Edit Confirmation Node");
  },

  "getHeaderMenuOptions": () => {
    return [{ "svg": "DeleteIconSVG", "title": Utilities.getInstance().getIntlMessage("FLOW-FORM-DELETE-BUTTON", "Delete") }];
  },

  "getTabs": (data, errors, callback) => {
    return [{
      "tabDisplayName": Utilities.getInstance().getIntlMessage("END-NODE-TAB-DISPLAY-NAME-CONFIG", "Config"),
      "tabFunc": getConfigTab(data, errors, callback)
    },
    {
      "tabDisplayName": Utilities.getInstance().getIntlMessage("CONFIRMATION-NODE-TAB-DISPLAY-NAME-OUTPUT", "Connections"),
      "tabFunc": getOutputTab(data, errors, callback)
    }];
  },
  "publish": publish,

  "unPublish": unPublish,
};

//////////////////////////////////
///     FormSection Class      ///
//////////////////////////////////
class FormSection extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    styledClass: PropTypes.func, // styled component class defined immediately above
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    hideDivider: PropTypes.bool,
    sectionHeader: PropTypes.string,
    sectionSubHeader: PropTypes.string,
    sectionDescription: PropTypes.string
  };

  static defaultProps = {
  };

  render() {
    return (
      <SectionContainer
        hideDivider={this.props.hideDivider}
      >
        <SectionHeaderText>{this.props.sectionHeader}</SectionHeaderText>
        {this.props.sectionSubHeader ? <SectionSubHeaderText>{this.props.sectionSubHeader}</SectionSubHeaderText> : undefined}
        <SectionDescriptionText>{this.props.sectionDescription}</SectionDescriptionText>
        {this.props.children !== undefined ? this.props.children : undefined}
      </SectionContainer>
    );
  }
}

///////////////////////////////
///     Styles Go Here      ///
///////////////////////////////
const SectionContainer = styled.section`
  background-color : ${colorGrid.gray2};
  box-shadow: ${props => props.hideDivider ? "none" : "inset 0px -1px 0px #CED4DA"};
  padding : 16px 24px 32px 24px; 
`;

const SectionHeaderText = styled.h1`
  color : ${colorGrid.brand5};
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

const SectionSubHeaderText = styled.h2`
  color : ${colorGrid.gray9};
  font-family: inherit;
  font-weight: 600;
  line-height: 16px;
  font-size: 14px;
`;

const SectionDescriptionText = styled(SectionSubHeaderText)`
  font-weight : normal;
`;

const StyledInput = styled(Input)`
  margin-bottom : 16px;
  margin-top : 8px;
`;

const TimeoutArea = styled.div`
  display : flex;
  height : 56px;

`;

const TimeoutInput = styled(Input)`
  margin : 0px 8px 0px 0px;
  width : 40%;
`;

const TimeoutDesinationSelect = styled(Select)`
  margin-right : 0px;
`;

const StyledSelect = styled(Select)`
  margin-bottom : 16px;
`;


const Label = styled.div`
  color : inherit; // deriving color from parent <Information />
  display : flex;
  flex-direction : column;
  font-size : 14px;
  font-weight : 600;
  line-height : 14px;
  user-select : none;
  width : 100%;
`;