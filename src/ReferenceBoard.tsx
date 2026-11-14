import { ATmega32U4 } from "./ATmega32U4"

/**
 * An unrouted, educational ATmega32U4-AU keyboard controller reference.
 *
 * VCC/GND and USB_DP/USB_DM are exposed named nets, not a USB connector.
 * This is intentionally not a complete, manufacturing-ready design.
 */
export default function ReferenceBoard() {
  return (
    <board width="75mm" height="50mm" routingDisabled>
      <ATmega32U4 name="U1" pcbX={0} pcbY={0} />

      {/* Digital, USB and analog supplies; duplicated pads stay distinct. */}
      <trace from=".U1 > .VCC14" to="net.VCC" />
      <trace from=".U1 > .VCC34" to="net.VCC" />
      <trace from=".U1 > .AVCC24" to="net.VCC" />
      <trace from=".U1 > .AVCC44" to="net.VCC" />
      <trace from=".U1 > .UVCC" to="net.VCC" />
      <trace from=".U1 > .GND15" to="net.GND" />
      <trace from=".U1 > .GND23" to="net.GND" />
      <trace from=".U1 > .GND35" to="net.GND" />
      <trace from=".U1 > .GND43" to="net.GND" />
      <trace from=".U1 > .UGND" to="net.GND" />
      <trace from=".U1 > .VBUS" to="net.USB_VBUS" />

      {/* External 16 MHz clock and nominal 22 pF loading capacitors.
          Confirm oscillator load capacitance using chosen crystal's datasheet. */}
      <crystal name="Y1" frequency="16MHz" loadCapacitance="18pF" footprint="hc49" pcbX={-16} pcbY={8} />
      <capacitor name="C_X1" capacitance="22pF" footprint="0603" pcbX={-24} pcbY={13} />
      <capacitor name="C_X2" capacitance="22pF" footprint="0603" pcbX={-24} pcbY={3} />
      <trace from=".U1 > .XTAL1" to=".Y1 > .pin1" />
      <trace from=".U1 > .XTAL2" to=".Y1 > .pin2" />
      <trace from=".Y1 > .pin1" to=".C_X1 > .pin1" />
      <trace from=".Y1 > .pin2" to=".C_X2 > .pin1" />
      <trace from=".C_X1 > .pin2" to="net.GND" />
      <trace from=".C_X2 > .pin2" to="net.GND" />

      {/* 10 kΩ reset pull-up and HWB pull-down (verify boot configuration). */}
      <resistor name="R_RST" resistance="10k" footprint="0603" pcbX={18} pcbY={13} />
      <trace from=".U1 > .RESET" to=".R_RST > .pin1" />
      <trace from=".R_RST > .pin2" to="net.VCC" />
      <resistor name="R_HWB" resistance="10k" footprint="0603" pcbX={18} pcbY={9} />
      <trace from=".U1 > .PE2_HWB" to=".R_HWB > .pin1" />
      <trace from=".R_HWB > .pin2" to="net.GND" />

      {/* USB data series elements; physical connector and ESD protection
          must be selected and validated separately. */}
      <resistor name="R_DP" resistance="22" footprint="0603" pcbX={-16} pcbY={-10} />
      <resistor name="R_DM" resistance="22" footprint="0603" pcbX={-16} pcbY={-14} />
      <trace from=".U1 > .USB_D_PLUS" to=".R_DP > .pin1" />
      <trace from=".U1 > .USB_D_MINUS" to=".R_DM > .pin1" />
      <trace from=".R_DP > .pin2" to="net.USB_DP" />
      <trace from=".R_DM > .pin2" to="net.USB_DM" />

      {/* UCAP is the internal USB regulator output, NOT a supply input. */}
      <capacitor name="C_UCAP" capacitance="1uF" footprint="0603" pcbX={-16} pcbY={-18} />
      <trace from=".U1 > .UCAP" to=".C_UCAP > .pin1" />
      <trace from=".C_UCAP > .pin2" to="net.GND" />

      {/* Supply and analog reference decoupling. */}
      <capacitor name="C_VCC" capacitance="100nF" footprint="0603" pcbX={18} pcbY={5} />
      <trace from=".C_VCC > .pin1" to="net.VCC" />
      <trace from=".C_VCC > .pin2" to="net.GND" />
      <capacitor name="C_AVCC" capacitance="100nF" footprint="0603" pcbX={18} pcbY={1} />
      <trace from=".C_AVCC > .pin1" to="net.VCC" />
      <trace from=".C_AVCC > .pin2" to="net.GND" />
      <capacitor name="C_AREF" capacitance="100nF" footprint="0603" pcbX={18} pcbY={-3} />
      <trace from=".U1 > .AREF" to=".C_AREF > .pin1" />
      <trace from=".C_AREF > .pin2" to="net.GND" />
    </board>
  )
}
