import { expect, test } from "bun:test"
import { RootCircuit } from "tscircuit"
import { fp } from "@tscircuit/footprinter"
import {
  ATMEGA32U4_FOOTPRINT,
  ATMEGA32U4_PIN_LABELS,
} from "../src/ATmega32U4"
import ReferenceBoard from "../src/ReferenceBoard"

const expectedPinNames = [
  "PE6", "UVCC", "USB_D_MINUS", "USB_D_PLUS", "UGND", "UCAP", "VBUS",
  "PB0", "PB1", "PB2", "PB3", "PB7", "RESET", "VCC14", "GND15",
  "XTAL2", "XTAL1", "PD0", "PD1", "PD2", "PD3", "PD5", "GND23",
  "AVCC24", "PD4", "PD6", "PD7", "PB4", "PB5", "PB6", "PC6",
  "PC7", "PE2_HWB", "VCC34", "GND35", "PF7", "PF6", "PF5", "PF4",
  "PF1", "PF0", "AREF", "GND43", "AVCC44",
]

test("44 ATmega32U4-AU pins match the datasheet's physical order", () => {
  const entries = Object.entries(ATMEGA32U4_PIN_LABELS)
  expect(entries).toHaveLength(44)
  expect(entries.map(([name]) => name)).toEqual(
    Array.from({ length: 44 }, (_, index) => "pin" + (index + 1)),
  )
  expect(entries.map(([, label]) => label).join(",")).toBe(expectedPinNames.join(","))
  expect(new Set(Object.values(ATMEGA32U4_PIN_LABELS)).size).toBe(44)
  expect(ATMEGA32U4_PIN_LABELS.pin3).toBe("USB_D_MINUS")
  expect(ATMEGA32U4_PIN_LABELS.pin4).toBe("USB_D_PLUS")
  expect(ATMEGA32U4_PIN_LABELS.pin6).toBe("UCAP")
  expect(ATMEGA32U4_PIN_LABELS.pin13).toBe("RESET")
  expect(ATMEGA32U4_PIN_LABELS.pin16).toBe("XTAL2")
  expect(ATMEGA32U4_PIN_LABELS.pin17).toBe("XTAL1")
})

test("tqfp44 footprint resolves to 44 individually indexed copper pads", () => {
  const pads = fp.string(ATMEGA32U4_FOOTPRINT).circuitJson().filter(
    (e) => e.type === "pcb_smtpad",
  )
  expect(pads).toHaveLength(44)
  expect(
    new Set(pads.flatMap((pad) => pad.port_hints ?? [])),
  ).toEqual(new Set(Array.from({ length: 44 }, (_, i) => String(i + 1))))
})

test("reference schematic renders MCU ports and supporting components", async () => {
  const circuit = new RootCircuit()
  circuit.add(<ReferenceBoard />)
  await circuit.renderUntilSettled()
  const circuitJson = circuit.getCircuitJson()
  const u1 = circuitJson.find(
    (e) => e.type === "source_component" && e.name === "U1",
  )
  expect(u1).toBeDefined()
  if (!u1 || u1.type !== "source_component") return
  const ports = circuitJson.filter(
    (e) => e.type === "source_port" &&
      e.source_component_id === u1.source_component_id,
  )
  expect(ports).toHaveLength(44)
  expect(circuitJson.filter((e) => e.type === "pcb_smtpad" && e.pcb_component_id !== undefined).length).toBeGreaterThanOrEqual(44)
  expect(circuitJson.filter((e) => e.type === "source_failed_to_create_component_error")).toEqual([])
  expect(circuitJson.filter((e) => e.type === "source_trace_not_connected_error")).toEqual([])
  for (const name of ["C_UCAP", "R_DP", "R_DM", "R_RST", "R_HWB", "Y1"]) {
    expect(circuitJson.some(
      (e) => e.type === "source_component" && e.name === name,
    )).toBe(true)
  }
}, 120_000)
