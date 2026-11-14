# ATmega32U4 keyboard controller reference (issue #2)

A datasheet-backed, **unrouted** reference component and a minimal keyboard
controller support circuit for the ATmega32U4-AU (TQFP-44).

This repository was previously only a placeholder. The deliverable provides:
- A reusable TSX \`ATmega32U4\` component with a **physical 1–44 pad-to-signal map**.
- A 16 MHz crystal, nominal 22 pF load capacitors, USB 22 Ω series
  resistors, reset and HWB 10 kΩ resistors, UCAP 1 µF capacitor,
  and VCC/AVCC/AREF decoupling in a deliberately unrouted \`ReferenceBoard\`.
- Deterministic tests comparing every physical pad name to the published
  ATmega32U4 datasheet and ensuring that the TQFP footprint emits 44 copper pads.
- A real Circuit JSON render test for all 44 MCU ports, selected
  peripherals and absence of missing-component/unresolved-trace errors.

## Usage

\`\`\`tsx
import { ATmega32U4 } from "./src/ATmega32U4"

export default () => (
  <board width="30mm" height="30mm" routingDisabled>
    <ATmega32U4 name="U1" />
  </board>
)
\`\`\`

The \`src/ReferenceBoard.tsx\` example exposes logical nets \`USB_DP\`,
\`USB_DM\`, \`USB_VBUS\`, \`VCC\` and \`GND\` for **integration**.
The example does NOT supply the actual USB connector, ESD protection, input
voltage/power regulation, keyboard switch matrix, ISP header, or complete
assembly/PCB. The footprint is \`tqfp44_w10_h10_p0.8mm\`.

## Mandatory hardware validation before fabrication

1. Confirm the exact manufacturer suffix/package/land-pattern dimensions,
   footprints, mating USB connector pin orientation and the supply voltage.
2. Validate USB D+/D- routing, ESD and VBUS detection. The exposed \`USB_DP\`
   and \`USB_DM\` nets are **not** a completed physical USB connector design.
3. Size the two crystal load capacitors for the chosen crystal's *actual*
   load capacitance and board/parasitic capacitance; the provided 22 pF
   values are **illustrative**, not a universally correct selection.
4. Confirm reset/HWB boot strapping with the firmware/bootloader and
   applicable MCU revision, including brown-out/fuse setup.
5. Run electrical rules checks, physical DRC, native KiCad parity,
   clearance, thermals, assembly and USB compliance tests.

The design is a code-level **reference, not a qualified manufacturing design**.

## Datasheet and numbering evidence

- ATmega16U4/ATmega32U4 datasheet, document 7766F, Figure 1-1:
  https://cdn.sparkfun.com/datasheets/Dev/Arduino/Boards/ATMega32U4.pdf
- Arduino's pin mapping:
  https://docs.arduino.cc/retired/hacking/hardware/PinMapping32u4
- Original keyboard reference requested in the issue:
  https://github.com/ruiqimao/keyboard-pcb-guide#schematics

Pin names on repeated power/ground pads carry a physical suffix (e.g.
\`VCC14\` and \`VCC34\`) to preserve unique selectors. These names represent
the **same electrical supply** and are explicitly connected to the same net
in \`ReferenceBoard\`. Distinct pin labels are deliberate to avoid conflation.

## Development

\`\`\`sh
bun install
bun test
bun run typecheck
\`\`\`

Some upstream dependencies publish raw TypeScript source. A clean typecheck
of the *entire dependency graph* may require upstream type updates; tests
validate runtime behavior directly and must not be mistaken for fabrication
qualification.
