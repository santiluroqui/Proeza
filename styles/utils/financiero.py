import pandas as pd


def calcular_cuota(monto: float, plazo: int, factor_interno: float) -> float:
    tasa_mensual = factor_interno / 12
    if tasa_mensual <= 0:
        return monto / plazo
    cuota = monto * (tasa_mensual * (1 + tasa_mensual) ** plazo) / (((1 + tasa_mensual) ** plazo) - 1)
    return cuota


def generar_cronograma(monto: float, plazo: int, factor_interno: float) -> pd.DataFrame:
    cuota = calcular_cuota(monto, plazo, factor_interno)
    saldo = monto
    tasa_mensual = factor_interno / 12
    filas = []

    for mes in range(1, plazo + 1):
        interes_estimado = saldo * tasa_mensual
        capital = cuota - interes_estimado
        if capital > saldo:
            capital = saldo
            cuota_final = capital + interes_estimado
        else:
            cuota_final = cuota
        saldo = max(0, saldo - capital)
        filas.append({
            "Mes": mes,
            "Cuota estimada (Bs)": round(cuota_final, 2),
            "Abono a capital (Bs)": round(capital, 2),
            "Cargo financiero estimado (Bs)": round(interes_estimado, 2),
            "Saldo restante (Bs)": round(saldo, 2),
        })
    return pd.DataFrame(filas)


FACTORES_PRODUCTOS = {
    "Impulso Personal": 0.18,
    "Crece Emprendedor": 0.16,
    "Solución Ágil": 0.20,
}
