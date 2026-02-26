"use client";

import { useState } from "react";
import {
  CreditCard,
  BarChart3,
  Building,
  Percent,
  Calculator,
  DollarSign,
  TrendingUp,
  Layers,
  GitBranch,
  Users,
  ArrowRight,
  ShieldCheck,
  Scale,
  HardHat,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import ScenarioComparison from "@/components/calculators/ScenarioComparison";
import MarketRateBanner from "@/components/calculators/MarketRateBanner";
import CalculatorNav from "@/components/calculators/CalculatorNav";
import type { CalculatorNavItem } from "@/components/calculators/CalculatorNav";
import {
  LoanPaymentCalculator,
  DscrCalculator,
  MaxLoanCalculator,
  DebtYieldCalculator,
  LtvCalculator,
  CapRateCalculator,
  PropertyValueCalculator,
  CashOnCashCalculator,
  IrrCalculator,
  BlendedRateCalculator,
  WaterfallCalculator,
  PartnerSplitCalculator,
  ConstructionLoanCalculator,
  RefinanceCalculator,
} from "@/components/calculators/calculators";

// Calculator navigation config — ordered by deal workflow (14 total)
const CALCULATORS: readonly CalculatorNavItem[] = [
  { id: "loan-payment", label: "Loan Payment", shortLabel: "Payment", icon: CreditCard },
  { id: "dscr", label: "DSCR Calculator", shortLabel: "DSCR", icon: BarChart3 },
  { id: "max-loan", label: "Max Loan from DSCR", shortLabel: "Max Loan", icon: Building },
  { id: "debt-yield", label: "Debt Yield", shortLabel: "Debt Yield", icon: ShieldCheck },
  { id: "ltv", label: "LTV Calculator", shortLabel: "LTV", icon: Scale },
  { id: "cap-rate", label: "Cap Rate", shortLabel: "Cap Rate", icon: Percent },
  { id: "property-value", label: "Property Valuation", shortLabel: "Valuation", icon: Calculator },
  { id: "cash-on-cash", label: "Cash-on-Cash", shortLabel: "Cash/Cash", icon: DollarSign },
  { id: "irr", label: "IRR & Equity Multiple", shortLabel: "IRR", icon: TrendingUp },
  { id: "blended-rate", label: "Blended Rate", shortLabel: "Blended", icon: Layers },
  { id: "waterfall", label: "Equity Waterfall", shortLabel: "Waterfall", icon: GitBranch },
  { id: "partner-split", label: "Partner Split", shortLabel: "Partners", icon: Users },
  { id: "construction", label: "Construction Interest", shortLabel: "Const.", icon: HardHat },
  { id: "refinance", label: "Refinance Savings", shortLabel: "Refi", icon: RefreshCw },
] as const;

// Calculators that support scenario comparison
const SCENARIO_ENABLED = new Set([
  "loan-payment",
  "dscr",
  "max-loan",
  "irr",
]);

// Map calculators to relevant service context
const CALCULATOR_SERVICE_LINKS: Record<string, { label: string; text: string }> = {
  "loan-payment": { label: "Permanent Financing", text: "Exploring permanent debt options?" },
  dscr: { label: "Permanent Financing", text: "Need a lender who understands your DSCR?" },
  "max-loan": { label: "Permanent Financing", text: "Want to know your real borrowing power?" },
  "debt-yield": { label: "Permanent Financing", text: "Debt yield driving your deal structure?" },
  ltv: { label: "Permanent Financing", text: "Looking for higher leverage?" },
  "cap-rate": { label: "Permanent Financing", text: "Evaluating an acquisition?" },
  "property-value": { label: "Permanent Financing", text: "Sizing up a deal?" },
  "cash-on-cash": { label: "Permanent Financing", text: "Optimizing your return?" },
  irr: { label: "Permanent Financing", text: "Modeling your exit?" },
  "blended-rate": { label: "Specialty & Creative Structures", text: "Need a creative capital stack?" },
  waterfall: { label: "Specialty & Creative Structures", text: "Structuring a partnership?" },
  "partner-split": { label: "Specialty & Creative Structures", text: "Splitting equity with partners?" },
  construction: { label: "Construction Loans", text: "Planning a ground-up project?" },
  refinance: { label: "Refinance", text: "Think you can do better than your current rate?" },
};

// Map calculator IDs to their components
const CALCULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  "loan-payment": LoanPaymentCalculator,
  dscr: DscrCalculator,
  "max-loan": MaxLoanCalculator,
  "debt-yield": DebtYieldCalculator,
  ltv: LtvCalculator,
  "cap-rate": CapRateCalculator,
  "property-value": PropertyValueCalculator,
  "cash-on-cash": CashOnCashCalculator,
  irr: IrrCalculator,
  "blended-rate": BlendedRateCalculator,
  waterfall: WaterfallCalculator,
  "partner-split": PartnerSplitCalculator,
  construction: ConstructionLoanCalculator,
  refinance: RefinanceCalculator,
};

export default function MortgageCalculatorPage() {
  const [activeCalculator, setActiveCalculator] = useState("loan-payment");

  const ActiveCalc = CALCULATOR_COMPONENTS[activeCalculator];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
            CRE Analysis Suite
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight">
            Commercial Mortgage Calculators
          </h1>
          <p className="mt-4 text-white/60 text-lg">
            No more guessing where your deal sizes. These are the same tools we
            use every day. Run your numbers, stress-test the stack, and see
            exactly where your deal shakes out.
          </p>
        </div>
      </section>

      {/* Live Market Rate Banner */}
      <MarketRateBanner />

      {/* Calculator Suite */}
      <section className="bg-cream py-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Mobile: horizontal scroll tab bar (hidden on desktop) */}
          <CalculatorNav
            calculators={CALCULATORS}
            active={activeCalculator}
            onChange={setActiveCalculator}
          />

          <div className="flex gap-8">
            {/* Desktop: sticky sidebar (hidden on mobile) */}
            <nav className="hidden lg:block w-[280px] flex-shrink-0">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-4">
                  Calculators
                </p>
                <div className="space-y-1">
                  {CALCULATORS.map((calc) => {
                    const Icon = calc.icon;
                    return (
                      <button
                        key={calc.id}
                        onClick={() => setActiveCalculator(calc.id)}
                        className={`w-full text-left px-4 py-3 text-sm rounded-sm transition-colors flex items-center gap-3 ${
                          activeCalculator === calc.id
                            ? "bg-white shadow-sm text-warmgray-heading font-medium"
                            : "text-warmgray hover:text-warmgray-heading hover:bg-white/50"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={
                            activeCalculator === calc.id
                              ? "text-sage-400"
                              : "text-warmgray/40"
                          }
                        />
                        {calc.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Calculator content */}
            <div className="flex-1 min-w-0">
              {ActiveCalc && (
                SCENARIO_ENABLED.has(activeCalculator) ? (
                  <ScenarioComparison
                    key={activeCalculator}
                    CalculatorComponent={ActiveCalc}
                  >
                    <ActiveCalc />
                  </ScenarioComparison>
                ) : (
                  <ActiveCalc />
                )
              )}

              {/* Contextual service link */}
              {CALCULATOR_SERVICE_LINKS[activeCalculator] && (
                <div className="mt-8 bg-white rounded-sm p-6 shadow-sm border-l-4 border-sage-400 flex items-center justify-between">
                  <div>
                    <p className="text-warmgray-heading text-sm font-medium">
                      {CALCULATOR_SERVICE_LINKS[activeCalculator].text}
                    </p>
                    <p className="text-warmgray text-xs mt-1">
                      Learn about our {CALCULATOR_SERVICE_LINKS[activeCalculator].label.toLowerCase()} services.
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-sage-400 text-xs uppercase tracking-[2px] font-medium hover:text-navy-500 transition-colors flex-shrink-0 ml-4"
                  >
                    View Services <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-warmgray text-sm mb-4">
              These calculators provide estimates for educational purposes only.
              Actual terms vary based on property type, location, borrower
              experience, and market conditions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-sage-400 text-white font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-sage-400/90 transition-all rounded-sm"
            >
              Get a Real Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
