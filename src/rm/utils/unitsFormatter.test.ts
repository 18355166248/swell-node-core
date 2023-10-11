import { unitsFormatter, proportion } from "./unitsFormatter";

describe("unitsFormatter", () => {
  it("格式化数字大小 返回 MB", () => {
    const val1 = unitsFormatter(proportion * proportion);
    expect(val1).toBe("1.00MB");

    const val2 = unitsFormatter(proportion * proportion * 1.31);
    expect(val2).toBe("1.31MB");
  });
  it("格式化数字大小 返回 GB", () => {
    const val1 = unitsFormatter(proportion * proportion * proportion * 2);
    expect(val1).toBe("2.00GB");
  });

  it("格式化0", () => {
    const val1 = unitsFormatter(0);
    expect(val1).toBe("0.00MB");
  });
});
