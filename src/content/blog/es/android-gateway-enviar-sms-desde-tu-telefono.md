---
title: "Envía SMS masivos por €0,01 usando tu teléfono Android — empieza gratis"
description: "El Android Gateway de SMSPM convierte cualquier smartphone Android en un emisor personal de SMS. Enruta operadores seleccionados a través de tu propia tarjeta SIM, paga solo €0,01 por mensaje y muestra tu número real a los destinatarios."
pubDate: 2025-07-01
author: "Equipo SMSPM"
tags: ["android-gateway", "sms-masivo", "ahorro", "guia"]
draft: false
---

La mayoría de plataformas de SMS masivo cobran entre €0,05 y €0,45 por mensaje según el país. SMSPM tiene una función que puede reducir eso a **€0,01 por SMS** para cualquier operador donde tengas una SIM local — usando tu propio teléfono Android como dispositivo de envío. Aquí te explicamos cómo funciona y por qué vale la pena probarlo.

## ¿Qué es el Android Gateway?

El Android Gateway es una opción de enrutamiento dentro de SMSPM. En lugar de enviar SMS a través de un proveedor comercial, la plataforma empuja el mensaje por Firebase Cloud Messaging a un teléfono Android conectado, que lo envía desde la tarjeta SIM del teléfono — exactamente como un mensaje de texto normal.

Desde la perspectiva del destinatario, el SMS llega desde un número real al que puede llamar. No desde "Info", "Authmsg" ni un código corto aleatorio. Desde tu número real.

## Por qué esto importa más de lo que crees

Los operadores móviles han estado eliminando progresivamente los IDs de remitente alfanuméricos del tráfico SMS entrante. Un mensaje que envías como "TuEmpresa" a menudo llega como "Info" o una etiqueta genérica — dependiendo del operador y el país.

Cuando envías a través del Android Gateway, el destinatario ve el número de tu tarjeta SIM — un número móvil real con el que puede:
- Llamarte directamente
- Guardar el número en sus contactos
- Responderte (las respuestas van al buzón del teléfono)

Para empresas locales que envían recordatorios de citas, notificaciones de entrega o promociones, esto supone una diferencia significativa en confianza y tasas de apertura.

## ¿Qué cuesta realmente?

| Ruta | Coste por SMS |
|---|---|
| Gateway comercial SMSPM | €0,02 – €0,45 (según operador) |
| Android Gateway | **€0,01 fijo** |

Los €0,01 son la tarifa de plataforma de SMSPM — cubre infraestructura, entrega push via FCM y lógica de enrutamiento. **Los cargos de tu tarjeta SIM son aparte y dependen de tu plan de telefonía móvil.** En la mayoría de países, los planes estándar incluyen una gran cuota mensual de SMS (típicamente 1.000) — por lo que en la práctica, a menudo solo pagas la tarifa de plataforma de €0,01 por mensaje.

**Ejemplo:** 1.000 SMS a un operador turco a través del gateway comercial a €0,12 cada uno = **€120**. A través del Android Gateway con un plan que incluye 1.000 SMS gratuitos = **€10**. Un ahorro del 92%.

## Puedes empezar gratis

SMSPM no tiene cuota mensual ni gasto mínimo. [Crea una cuenta gratuita](https://app.smspm.com/app/register), recarga con la cantidad que quieras, y puedes probar el Android Gateway de inmediato. La configuración tarda unos 5 minutos.

Solo necesitas:
- Un teléfono Android con Android 8.0 o superior (la mayoría de teléfonos desde 2017 cumplen los requisitos)
- Una tarjeta SIM en él
- La app SMSPM Gateway (descarga del APK desde tu panel → Dispositivos)

## Cómo configurarlo

**Paso 1 — Descarga e instala la app**  
Ve a tu panel de SMSPM → Dispositivos y descarga el APK de SMSPM Gateway. Instálalo en el teléfono Android que quieras usar como gateway.

**Paso 2 — Concede permisos**  
La app necesita permisos de Enviar SMS, Estado del teléfono y Notificaciones, además de una exención de optimización de batería para permanecer activa en segundo plano.

**Paso 3 — Genera un código de emparejamiento**  
En el panel → Dispositivos, haz clic en **Generar código de emparejamiento**. Aparece un código de 6 dígitos, válido 15 minutos.

**Paso 4 — Empareja el teléfono**  
Introduce el código en la app y pulsa **Emparejar dispositivo**. El panel detecta el emparejamiento automáticamente y muestra tu dispositivo.

**Paso 5 — Configura el enrutamiento**  
Ve al panel → Precios. Para cada operador que quieras enrutar a través de tu teléfono, encuéntralo en la tabla y cambia el menú desplegable de Ruta de "SMSPM (predeterminado)" a tu teléfono.

**Paso 6 — Envía**  
Envía SMS normalmente a través del panel o la API. Los mensajes que coincidan con la ruta de tu teléfono se reenviarán automáticamente al dispositivo y se enviarán desde tu SIM.

## ¿Qué pasa si el teléfono está desconectado?

Por defecto, el **fallback está activado**: si el teléfono no está disponible, el mensaje se reenruta automáticamente a través del proveedor comercial de SMSPM en 10 minutos. No se pierde ningún SMS.

Si desactivas el fallback, el mensaje espera en una cola de reintentos hasta 24 horas. Cuando el teléfono vuelva a estar en línea, abre la app y pulsa **"↓ Obtener en cola"** para reenviar inmediatamente todos los mensajes pendientes.

## ¿Listo para probarlo?

[Crea tu cuenta gratuita en SMSPM](https://app.smspm.com/app/register) y conecta tu primer dispositivo Android. Sin suscripción, sin gasto mínimo — solo €0,01 por SMS a través de tu propia tarjeta SIM.

[Ver precios por país →](/es/precios-sms)  
[Documentación completa del Android Gateway →](https://app.smspm.com/app/devices)
