package com.sentaient.liquid

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle

/**
 * Liquid Glance Widget for Android Home Screens
 * Displays real-time runway, tokenized yield, and ZK solvency proof.
 */
class LiquidGlanceWidget : GlanceAppWidget() {

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val prefs = context.getSharedPreferences("LiquidSharedPrefs", Context.MODE_PRIVATE)
        val runwayMonths = prefs.getFloat("cashRunwayMonths", 24.0f)
        val totalCashUSD = prefs.getFloat("totalCashUSD", 4250000.0f)
        val activeSweepApy = prefs.getFloat("activeSweepApy", 5.15f)
        val zkSolvencyStatus = prefs.getString("zkSolvencyStatus", "100%_VERIFIED") ?: "100%_VERIFIED"

        provideContent {
            GlanceTheme {
                WidgetContent(
                    runwayMonths = runwayMonths,
                    totalCashUSD = totalCashUSD,
                    activeSweepApy = activeSweepApy,
                    zkSolvencyStatus = zkSolvencyStatus
                )
            }
        }
    }

    @Composable
    private fun WidgetContent(
        runwayMonths: Float,
        totalCashUSD: Float,
        activeSweepApy: Float,
        zkSolvencyStatus: String
    ) {
        Box(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(Color(0xFF0A0F1C))
                .padding(14.dp)
        ) {
            Column(
                modifier = GlanceModifier.fillMaxSize(),
                verticalAlignment = Alignment.Top,
                horizontalAlignment = Alignment.Start
            ) {
                Row(
                    modifier = GlanceModifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "LIQUID",
                        style = TextStyle(
                            color = androidx.glance.unit.ColorProvider(Color(0xFF3B82F6)),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    )
                    Spacer(modifier = GlanceModifier.defaultWeight())
                    Text(
                        text = if (zkSolvencyStatus == "100%_VERIFIED") "✓ ZK SOLVENT" else "ATTESTING",
                        style = TextStyle(
                            color = androidx.glance.unit.ColorProvider(Color(0xFF10B981)),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    )
                }

                Spacer(modifier = GlanceModifier.height(12.dp))

                Text(
                    text = "CASH RUNWAY",
                    style = TextStyle(
                        color = androidx.glance.unit.ColorProvider(Color(0xFF94A3B8)),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Medium
                    )
                )

                Text(
                    text = "${String.format("%.1f", runwayMonths)} MO",
                    style = TextStyle(
                        color = androidx.glance.unit.ColorProvider(Color.White),
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold
                    )
                )

                Spacer(modifier = GlanceModifier.height(8.dp))

                Row(modifier = GlanceModifier.fillMaxWidth()) {
                    Text(
                        text = "$${String.format("%.1f", totalCashUSD / 1_000_000f)}M Cash",
                        style = TextStyle(
                            color = androidx.glance.unit.ColorProvider(Color.White),
                            fontSize = 11.sp
                        )
                    )
                    Spacer(modifier = GlanceModifier.defaultWeight())
                    Text(
                        text = "${String.format("%.2f", activeSweepApy)}% APY",
                        style = TextStyle(
                            color = androidx.glance.unit.ColorProvider(Color(0xFF3B82F6)),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                    )
                }
            }
        }
    }
}

class LiquidGlanceWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = LiquidGlanceWidget()
}
