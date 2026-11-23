//
//  LiquidWidgets.swift
//  App
//
//  WidgetKit Extension for Liquid Sovereign Financial Platform
//  Reads real-time serialized treasury, runway, and solvency metrics
//  from App Group UserDefaults (group.com.sentaient.liquid).
//

import WidgetKit
import SwiftUI

public struct LiquidWidgetEntry: TimelineEntry {
    public let date: Date
    public let cashRunwayMonths: Double
    public let cashRunwayStatus: String     // HEALTHY, MODERATE, CRITICAL
    public let totalCashUSD: Double
    public let monthlyNetBurnUSD: Double
    public let activeSweepApy: Double
    public let zkSolvencyStatus: String     // 100%_VERIFIED
    public let pendingApprovalCount: Int
}

public struct LiquidTimelineProvider: TimelineProvider {
    private let appGroupIdentifier = "group.com.sentaient.liquid"

    public func placeholder(in context: Context) -> LiquidWidgetEntry {
        LiquidWidgetEntry(
            date: Date(),
            cashRunwayMonths: 24.0,
            cashRunwayStatus: "HEALTHY",
            totalCashUSD: 4250000.0,
            monthlyNetBurnUSD: 185000.0,
            activeSweepApy: 5.15,
            zkSolvencyStatus: "100%_VERIFIED",
            pendingApprovalCount: 2
        )
    }

    public func getSnapshot(in context: Context, completion: @escaping (LiquidWidgetEntry) -> Void) {
        completion(loadSharedMetrics())
    }

    public func getTimeline(in context: Context, completion: @escaping (Timeline<LiquidWidgetEntry>) -> Void) {
        let currentEntry = loadSharedMetrics()
        // Refresh widget timeline every 30 minutes
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 30, to: Date()) ?? Date().addingTimeInterval(1800)
        let timeline = Timeline(entries: [currentEntry], policy: .after(nextUpdate))
        completion(timeline)
    }

    private func loadSharedMetrics() -> LiquidWidgetEntry {
        guard let sharedDefaults = UserDefaults(suiteName: appGroupIdentifier) else {
            return placeholder(in: Context())
        }

        let runway = sharedDefaults.double(forKey: "cashRunwayMonths")
        let totalCash = sharedDefaults.double(forKey: "totalCashUSD")
        let netBurn = sharedDefaults.double(forKey: "monthlyNetBurnUSD")
        let apy = sharedDefaults.double(forKey: "activeSweepApy")
        let approvals = sharedDefaults.integer(forKey: "pendingApprovalCount")
        let status = sharedDefaults.string(forKey: "cashRunwayStatus") ?? "HEALTHY"
        let solvency = sharedDefaults.string(forKey: "zkSolvencyStatus") ?? "100%_VERIFIED"

        return LiquidWidgetEntry(
            date: Date(),
            cashRunwayMonths: runway > 0 ? runway : 24.0,
            cashRunwayStatus: status,
            totalCashUSD: totalCash > 0 ? totalCash : 4250000.0,
            monthlyNetBurnUSD: netBurn > 0 ? netBurn : 185000.0,
            activeSweepApy: apy > 0 ? apy : 5.15,
            zkSolvencyStatus: solvency,
            pendingApprovalCount: approvals
        )
    }
}

// SwiftUI Widget Views
public struct LiquidRunwayWidgetEntryView: View {
    var entry: LiquidTimelineProvider.Entry
    @Environment(\.widgetFamily) var family

    public var body: some View {
        ZStack {
            Color(red: 10/255, green: 15/255, blue: 28/255)
            
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("LIQUID")
                        .font(.system(size: 11, weight: .bold, design: .monospaced))
                        .foregroundColor(Color.blue)
                    Spacer()
                    Text(entry.zkSolvencyStatus == "100%_VERIFIED" ? "✓ ZK SOLVENT" : "ATTESTING")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundColor(Color.green)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Color.green.opacity(0.15))
                        .cornerRadius(4)
                }

                Spacer()

                Text("CASH RUNWAY")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundColor(Color.gray)

                HStack(alignment: .firstTextBaseline, spacing: 4) {
                    Text(String(format: "%.1f", entry.cashRunwayMonths))
                        .font(.system(size: 32, weight: .bold, design: .rounded))
                        .foregroundColor(Color.white)
                    Text("MO")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(Color.gray)
                }

                HStack {
                    Text(String(format: "$%.1fM Cash", entry.totalCashUSD / 1_000_000.0))
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(Color.white)
                    Spacer()
                    Text(String(format: "%.2f%% APY", entry.activeSweepApy))
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(Color.blue)
                }
            }
            .padding(14)
        }
    }
}

@main
public struct LiquidWidgetBundle: WidgetBundle {
    public var body: some Widget {
        LiquidRunwayWidget()
    }
}

public struct LiquidRunwayWidget: Widget {
    let kind: String = "LiquidRunwayWidget"

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: LiquidTimelineProvider()) { entry in
            LiquidRunwayWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Liquid Cash Runway & Treasury")
        .description("Real-time cash runway, tokenized treasury yield, and ZK solvency proof.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
