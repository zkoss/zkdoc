# Inputgroup

- **Demonstration**: [Inputgroup – organize your input components](https://blog.zkoss.org/2019/08/16/zk-9-preview-inputgroup-organize-your-input-components)
- **Java API**: [`org.zkoss.zul.Inputgroup`](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Inputgroup.html)
- **JavaScript API**: [`zul.wgt.Inputgroup`](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Inputgroup.html)

**Since**: 9.0.0

## Employment/Purpose
The Inputgroup component in ZK provides a way to prepend or append components to an input component, allowing for the creation of custom form-input components by merging different elements together. It allows for enhanced organization and layout flexibility in input forms.

## Example
The Inputgroup component can be used in various ways to enhance the user interface and functionality of input forms. The following examples demonstrate different use cases:

1. **Basic Inputgroup:**
   
   The basic inputgroup example demonstrates how to prepend text to a textbox using the `@` symbol.

   ![Inputgroup_basic](Inputgroup_basic.png)

   ```xml
   <zk>
       <inputgroup>
           @<textbox />
       </inputgroup>
       
       <inputgroup>
           <textbox placeholder="Recipient's username"/>@example.com
       </inputgroup>
       
       <inputgroup>
           $<textbox/>.00
       </inputgroup>
       
       <inputgroup>
           With textarea
           <textbox multiline="true" rows="5" cols="30"/>
       </inputgroup>
   </zk>
   ```

   Try it

   * [Inputgroup with Basic](https://zkfiddle.org/sample/3j1g0he/1-ZK-Component-Reference-Inputgroup-Basic-Example?v=latest&t=Iceblue%20Compact)

2. **Vertical Orientation:**
   
   The vertical orientation example shows how to set the inputgroup to display components vertically using the `orient` attribute.

   ![Inputgroup_vertical](Inputgroup_vertical.png)

   ```xml
   <zk>
        <inputgroup orient="vertical">
            First and last name<textbox/><textbox/>
        </inputgroup>
        
        <inputgroup orient="vertical">
            <button label="Button"/>
            <button label="Button"/>
            <button label="Button"/>
            <button label="Button"/>
        </inputgroup>
    </zk>
   ```

   Try it

   * [Inputgroup with Vertical](https://zkfiddle.org/sample/35fiuq3/1-ZK-Component-Reference-Inputgroup-Vertical-Example?v=latest&t=Iceblue%20Compact)

## Properties
### Orient
- **Description**: Specifies the orientation of the inputgroup.
- **Values**:
  - `horizontal` (default): Components are displayed horizontally.
  - `vertical`: Components are displayed vertically.

## Supported Children
- [`Label`](../Essential_Components/Label.md)
- [`InputElement`](../Base_Components/InputElement.md)
- [`LabelImageElement`](../Base_Components/LabelImageElement.md)