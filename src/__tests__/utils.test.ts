import { describe, it, expect } from "vitest";
import { formatCurrency, truncateAddress } from "@/lib/utils";

describe("Utility Functions", () => {
  it("should format currency correctly", () => {
    expect(formatCurrency(100)).toBe("$100.00");
    expect(formatCurrency(0.1)).toBe("$0.10");
  });

  it("should truncate Stellar addresses correctly", () => {
    const addr = "GC6UDM7GORCSK2DEOYSTAXLC3P7DHPIHSYMLALO2QNPSOIFIWDPMIF4K";
    expect(truncateAddress(addr, 4)).toBe("GC6U...IF4K");
  });
});
