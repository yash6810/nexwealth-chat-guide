interface GlossaryEntry {
  [key: string]: string;
}

export interface FinancialTerm {
  [language: string]: string;
}

export const financialGlossaryMultilingual: { [key: string]: FinancialTerm } = {
  "401k": {
    en: "A retirement savings plan sponsored by an employer that allows workers to save and invest a portion of their paycheck before taxes are taken out.",
    es: "Un plan de ahorro para la jubilación patrocinado por el empleador que permite a los trabajadores ahorrar e invertir una parte de su salario antes de que se deduzcan los impuestos.",
    fr: "Un plan d'épargne-retraite parrainé par l'employeur qui permet aux travailleurs d'épargner et d'investir une partie de leur salaire avant impôts.",
    de: "Ein arbeitgebergeförderter Altersvorsorgeplatz, der es Arbeitnehmern ermöglicht, einen Teil ihres Gehalts vor Steuern zu sparen und zu investieren.",
    zh: "一种由雇主赞助的退休储蓄计划，允许员工在扣税前储蓄和投资部分工资。",
    hi: "एक नियोक्ता द्वारा प्रायोजित सेवानिवृत्ति बचत योजना जो श्रमिकों को कर कटौती से पहले अपने वेतन का एक हिस्सा बचाने और निवेश करने की अनुमति देती है।"
  },
  "IRA": {
    en: "Individual Retirement Account - a tax-advantaged investment account for retirement savings.",
    es: "Cuenta de Jubilación Individual - una cuenta de inversión con ventajas fiscales para el ahorro para la jubilación.",
    fr: "Compte de retraite individuel - un compte d'investissement à avantages fiscaux pour l'épargne-retraite.",
    de: "Individuelles Rentenkonto - ein steuerbegünstigtes Anlagekonto für die Altersvorsorge.",
    zh: "个人退休账户 - 一种用于退休储蓄的税收优惠投资账户。",
    hi: "व्यक्तिगत सेवानिवृत्ति खाता - सेवानिवृत्ति बचत के लिए एक कर-लाभ निवेश खाता।"
  },
  "Roth IRA": {
    en: "A retirement account where contributions are made after-tax and withdrawals in retirement are tax-free.",
    es: "Una cuenta de jubilación donde las contribuciones se realizan después de impuestos y los retiros en la jubilación están libres de impuestos.",
    fr: "Un compte de retraite où les cotisations sont versées après impôt et les retraits à la retraite sont exonérés d'impôt.",
    de: "Ein Altersvorsorgekonto, bei dem Beiträge nach Steuern geleistet werden und Auszahlungen im Ruhestand steuerfrei sind.",
    zh: "一种退休账户，缴款是在税后进行的，退休后的提款是免税的。",
    hi: "एक सेवानिवृत्ति खाता जहां योगदान कर के बाद किया जाता है और सेवानिवृत्ति में निकासी कर-मुक्त होती है।"
  },
  "ETF": {
    en: "Exchange-Traded Fund - a type of investment fund that trades on stock exchanges.",
    es: "Fondo cotizado en bolsa - un tipo de fondo de inversión que se negocia en las bolsas de valores.",
    fr: "Fonds négocié en bourse - un type de fonds d'investissement qui se négocie sur les bourses.",
    de: "Exchange-Traded Fund - eine Art Investmentfonds, der an Börsen gehandelt wird.",
    zh: "交易所交易基金 - 一种在证券交易所交易的投资基金。",
    hi: "एक्सचेंज-ट्रेडेड फंड - एक प्रकार का निवेश फंड जो स्टॉक एक्सचेंजों पर कारोबार करता है।"
  },
  "Mutual Fund": {
    en: "An investment vehicle made up of a pool of money collected from many investors to invest in securities.",
    es: "Un vehículo de inversión compuesto por un fondo de dinero recaudado de muchos inversores para invertir en valores.",
    fr: "Un véhicule d'investissement composé d'un pool d'argent collecté auprès de nombreux investisseurs pour investir dans des titres.",
    de: "Ein Anlageinstrument, das sich aus einem Geldbündel zusammensetzt, das von vielen Anlegern gesammelt wurde, um in Wertpapiere zu investieren.",
    zh: "一种投资工具，由从许多投资者那里 collected 的资金池组成，用于投资证券。",
    hi: "एक निवेश वाहन जो प्रतिभूतियों में निवेश करने के लिए कई निवेशकों से एकत्र किए गए धन के पूल से बना है।"
  },
  "Compound Interest": {
    en: "Interest calculated on the initial principal and on the accumulated interest over previous periods.",
    es: "Interés calculado sobre el capital inicial y sobre los intereses acumulados durante períodos anteriores.",
    fr: "Intérêts calculés sur le principal initial et sur les intérêts accumulés au cours des périodes précédentes.",
    de: "Zinsen, die auf dem ursprünglichen Kapital und den aufgelaufenen Zinsen über frühere Zeiträume berechnet werden.",
    zh: "根据初始本金和之前期间累积的利息计算的利息。",
    hi: "प्रारंभिक मूलधन और पिछली अवधि में जमा ब्याज पर गणना की गई ब्याज।"
  },
  "FICO Score": {
    en: "A credit score created by the Fair Isaac Corporation, used by lenders to determine credit risk.",
    es: "Un puntaje de crédito creado por Fair Isaac Corporation, utilizado por los prestamistas para determinar el riesgo crediticio.",
    fr: "Un pointage de crédit créé par la Fair Isaac Corporation, utilisé par les prêteurs pour déterminer le risque de crédit.",
    de: "Ein von der Fair Isaac Corporation erstellter Kredit-Score, der von Kreditgebern verwendet wird, um das Kreditrisiko zu bestimmen.",
    zh: "由 Fair Isaac Corporation 创建的信用评分，贷款人使用它来确定信用风险。",
    hi: "फेयर Isaac Corporation द्वारा बनाया गया क्रेडिट स्कोर, जिसका उपयोग उधारदाताओं द्वारा क्रेडिट जोखिम निर्धारित करने के लिए किया जाता है।"
  },
  "Diversification": {
    en: "A risk management strategy that mixes a variety of investments within a portfolio.",
    es: "Una estrategia de gestión de riesgos que mezcla una variedad de inversiones dentro de una cartera.",
    fr: "Une stratégie de gestion des risques qui mélange une variété d'investissements au sein d'un portefeuille.",
    de: "Eine Risikomanagementstrategie, die eine Vielzahl von Anlagen innerhalb eines Portfolios mischt.",
    zh: "一种风险管理策略，将各种投资组合混合在一起。",
    hi: "एक जोखिम प्रबंधन रणनीति जो पोर्टफोलियो के भीतर विभिन्न प्रकार के निवेशों को मिलाती है।"
  },
  "Dollar-Cost Averaging": {
    en: "An investment strategy where you invest a fixed amount regularly, regardless of the asset's price.",
    es: "Una estrategia de inversión en la que invierte una cantidad fija con regularidad, independientemente del precio del activo.",
    fr: "Une stratégie d'investissement où vous investissez régulièrement un montant fixe, quel que soit le prix de l'actif.",
    de: "Eine Anlagestrategie, bei der Sie regelmäßig einen festen Betrag investieren, unabhängig vom Preis des Vermögenswerts.",
    zh: "一种投资策略，无论资产价格如何，您都可以定期投资固定金额。",
    hi: "एक निवेश रणनीति जहां आप परिसंपत्ति की कीमत की परवाह किए बिना, नियमित रूप से एक निश्चित राशि का निवेश करते हैं।"
  },
  "Emergency Fund": {
    en: "Money set aside for unexpected expenses or financial emergencies, typically 3-6 months of living expenses.",
    es: "Dinero reservado para gastos inesperados o emergencias financieras, generalmente de 3 a 6 meses de gastos de manutención.",
    fr: "Argent mis de côté pour les dépenses imprévues ou les urgences financières, généralement 3 à 6 mois de frais de subsistance.",
    de: "Geld, das für unerwartete Ausgaben oder finanzielle Notfälle zurückgelegt wird, typischerweise 3-6 Monate Lebenshaltungskosten.",
    zh: "为意外支出或财务紧急情况预留的资金，通常为 3-6 个月的生活费用。",
    hi: "अप्रत्याशित खर्चों या वित्तीय आपात स्थितियों के लिए अलग रखा गया धन, आमतौर पर 3-6 महीने का जीवन यापन खर्च।"
  },
  "APR": {
    en: "Annual Percentage Rate - the yearly rate charged for borrowing, expressed as a percentage.",
    es: "Tasa de porcentaje anual: la tasa anual que se cobra por los préstamos, expresada como un porcentaje.",
    fr: "Taux annuel en pourcentage - le taux annuel facturé pour l'emprunt, exprimé en pourcentage.",
    de: "Jährlicher Prozentsatz - der jährliche Zinssatz für die Kreditaufnahme, ausgedrückt als Prozentsatz.",
    zh: "年度百分比 - 借款收取的年度利率，以百分比表示。",
    hi: "वार्षिक प्रतिशत दर - उधार के लिए लिया जाने वाला वार्षिक दर, जिसे प्रतिशत के रूप में व्यक्त किया जाता है।"
  }
};
