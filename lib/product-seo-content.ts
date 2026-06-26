export type ProductSeoContent = {
  overview: string[];
  researchContext: string[];
  testingNote: string;
  storageNote: string;
  faqs: { question: string; answer: string }[];
};

export const PRODUCT_SEO_CONTENT: Record<string, ProductSeoContent> = {
  "bpc-157": {
    overview: [
      "BPC-157 is a synthetic peptide consisting of fifteen amino acids, derived from a protective protein sequence found in human gastric juice. Since its identification, it has become one of the most frequently referenced research peptides in literature concerning tissue repair mechanisms, largely because of its proposed role in promoting angiogenesis — the formation of new blood vessels — and in supporting structural protein activity at sites of tissue stress in research models.",
      "Genesis Genetics supplies BPC-157 exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "Most published research interest in BPC-157 falls into a handful of overlapping areas: gastrointestinal protection and healing (consistent with its gastric origin), tendon and ligament repair models, and angiogenesis-related study designs. Researchers studying recovery and tissue-repair pathways frequently reference BPC-157 alongside other compounds in our Regeneration category, such as TB-500, even though the two compounds are studied through different proposed mechanisms.",
    ],
    testingNote:
      "Every BPC-157 lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized BPC-157 should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is BPC-157?",
        answer:
          "BPC-157 is a synthetic pentadecapeptide based on a sequence identified in human gastric juice, widely referenced in research literature concerning tissue repair pathways, angiogenesis, and gastrointestinal research models.",
      },
      {
        question: "What purity standard does this BPC-157 meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, with the specific result documented on the included Certificate of Analysis.",
      },
      {
        question: "How should BPC-157 be stored after reconstitution?",
        answer:
          "Keep refrigerated and protected from light, and use within the stability window appropriate to that storage condition. See our Peptide Storage 101 article for detail.",
      },
      {
        question: "Is BPC-157 approved for human or veterinary use?",
        answer:
          "No. BPC-157 is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  "tb-500": {
    overview: [
      "TB-500 is a synthetic peptide modeled on the active region of Thymosin Beta-4, a naturally occurring protein involved in actin regulation — the cytoskeletal protein that underlies cell movement and structural remodeling. Research interest in TB-500 centers on this actin-binding activity, which has made it a frequent subject of literature examining cell migration, tissue remodeling, and wound-healing models.",
      "Genesis Genetics supplies TB-500 exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "TB-500 is most often discussed in research contexts involving cell migration during tissue repair, angiogenesis, and recovery from induced tissue injury in animal models. Because Thymosin Beta-4 is expressed broadly across tissue types, much of the published interest spans multiple organ systems rather than a single mechanism. TB-500 is frequently studied alongside BPC-157 in recovery-focused research, despite acting through a distinct actin-regulation pathway rather than the angiogenic pathway associated with BPC-157.",
    ],
    testingNote:
      "Every TB-500 lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized TB-500 should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is TB-500?",
        answer:
          "TB-500 is a synthetic peptide based on the active fragment of Thymosin Beta-4, an actin-regulating protein studied in tissue remodeling and cell-migration research.",
      },
      {
        question: "How is TB-500 different from BPC-157?",
        answer:
          "They are studied through different proposed mechanisms — TB-500 through actin regulation and cell migration, BPC-157 through angiogenesis and gastric-derived tissue protection — though both appear frequently in recovery-focused research literature.",
      },
      {
        question: "What purity standard does this TB-500 meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is TB-500 approved for human or veterinary use?",
        answer:
          "No. TB-500 is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  "ghk-cu": {
    overview: [
      "GHK-Cu is a naturally occurring copper-binding tripeptide (glycyl-histidyl-lysine bound to copper) first isolated from human plasma, where its concentration is known to decline with age. It has since become a frequently studied compound in skin biology and wound-healing research, largely due to its observed role in modulating collagen and elastin production, as well as antioxidant and anti-inflammatory activity in cell-culture models.",
      "Genesis Genetics supplies GHK-Cu exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "GHK-Cu research spans dermatological and connective-tissue contexts — extracellular matrix remodeling, fibroblast activity, and gene-expression studies examining how copper-peptide complexes influence tissue repair signaling. It is studied alongside other Regeneration-category compounds such as TB-500, and is one of the few compounds in our catalog with a substantial body of published in-vitro and dermal-research literature dating back several decades.",
    ],
    testingNote:
      "Every GHK-Cu lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized GHK-Cu should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is GHK-Cu?",
        answer:
          "GHK-Cu is a naturally occurring copper-binding tripeptide studied in skin biology and wound-healing research for its observed role in collagen and elastin regulation.",
      },
      {
        question: "Why is copper part of the molecule?",
        answer:
          "GHK naturally binds copper with high affinity; the copper-bound complex (GHK-Cu) is the form most commonly used in published research, rather than the unbound peptide.",
      },
      {
        question: "What purity standard does this GHK-Cu meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is GHK-Cu approved for human or veterinary use?",
        answer:
          "No. GHK-Cu is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  "cjc-1295-with-dac": {
    overview: [
      "CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH), modified with a Drug Affinity Complex (DAC) that binds to serum albumin, extending its activity well beyond that of natural GHRH. This extended-duration profile has made it a frequent subject of research into sustained growth hormone and IGF-1 secretion patterns, as opposed to the short pulsatile release studied with unmodified GHRH analogs.",
      "Genesis Genetics supplies CJC-1295 with DAC exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "Research interest in CJC-1295 centers on the GHRH receptor pathway and downstream GH/IGF-1 signaling, often in studies comparing sustained-release secretagogues against shorter-acting compounds like Ipamorelin or Tesamorelin. Because of its prolonged half-life, it is frequently used in research designs examining cumulative or steady-state hormonal effects rather than single-pulse responses.",
    ],
    testingNote:
      "Every CJC-1295 with DAC lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized CJC-1295 with DAC should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is CJC-1295 with DAC?",
        answer:
          "It is a synthetic GHRH analog modified with a Drug Affinity Complex that extends its activity duration, studied for sustained growth hormone and IGF-1 secretion research.",
      },
      {
        question: "How does it differ from Ipamorelin?",
        answer:
          "CJC-1295 acts on the GHRH receptor with an extended duration of activity, while Ipamorelin acts on the ghrelin receptor with a shorter pulse profile — the two are frequently studied together for comparative or combined secretagogue research.",
      },
      {
        question: "What purity standard does this product meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is this product approved for human or veterinary use?",
        answer:
          "No. CJC-1295 with DAC is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  ipamorelin: {
    overview: [
      "Ipamorelin is a synthetic pentapeptide studied as a selective growth hormone secretagogue, acting on the ghrelin receptor (GHSR) to stimulate growth hormone release. Its research profile is frequently distinguished from earlier secretagogues by its selectivity — published research has examined whether it stimulates GH pulses with comparatively less effect on cortisol and prolactin than older compounds in the same class.",
      "Genesis Genetics supplies Ipamorelin exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "Ipamorelin is commonly studied alongside GHRH analogs such as CJC-1295 or Tesamorelin in combined-secretagogue research designs, since the two compound classes act on distinct receptors (ghrelin receptor versus GHRH receptor) and are often examined together for additive effects on the GH/IGF-1 axis.",
    ],
    testingNote:
      "Every Ipamorelin lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized Ipamorelin should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is Ipamorelin?",
        answer:
          "Ipamorelin is a synthetic pentapeptide studied as a selective ghrelin-receptor agonist for growth hormone secretion research, noted for selectivity relative to older secretagogues.",
      },
      {
        question: "Why is it often paired with CJC-1295 in research?",
        answer:
          "The two compounds act on different receptors in the GH-release pathway (ghrelin receptor versus GHRH receptor), making them a common pairing in research examining combined or additive secretagogue effects.",
      },
      {
        question: "What purity standard does this Ipamorelin meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is Ipamorelin approved for human or veterinary use?",
        answer:
          "No. Ipamorelin is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  tesamorelin: {
    overview: [
      "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH) with a modified N-terminus that increases its resistance to enzymatic degradation. It has one of the more extensive published research records among GHRH analogs, including studies examining its effects on the GH/IGF-1 axis and visceral adipose tissue in clinical literature.",
      "Genesis Genetics supplies Tesamorelin exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use, and nothing here should be read as a reference to any approved clinical application.",
    ],
    researchContext: [
      "Tesamorelin research is concentrated in two overlapping areas: GHRH-receptor pharmacology and metabolic research examining visceral fat and lipid markers in connection with the GH axis. Within research settings, it is frequently used as a reference GHRH analog when comparing newer secretagogues such as CJC-1295.",
    ],
    testingNote:
      "Every Tesamorelin lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized Tesamorelin should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is Tesamorelin?",
        answer:
          "Tesamorelin is a synthetic GHRH analog with a modified structure for enzymatic stability, studied in connection with the GH/IGF-1 axis and metabolic research literature.",
      },
      {
        question: "Is Tesamorelin the same as a prescription product?",
        answer:
          "Tesamorelin as a molecule has an approved pharmaceutical use in some jurisdictions; the material sold here is supplied strictly as a research compound, not as that or any other approved drug product.",
      },
      {
        question: "What purity standard does this Tesamorelin meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is this product approved for human or veterinary use as sold here?",
        answer:
          "No. As sold by Genesis Genetics, Tesamorelin is strictly for laboratory and research use and is not intended for human or veterinary administration.",
      },
    ],
  },

  "ara-290": {
    overview: [
      "ARA-290 is a synthetic peptide derived from a non-erythropoietic region of erythropoietin (EPO) — meaning it is designed to engage tissue-protective signaling without the blood-cell-stimulating activity associated with full EPO. Research on ARA-290 centers on the innate repair receptor (IRR), a signaling complex implicated in inflammatory and tissue-protective pathways.",
      "Genesis Genetics supplies ARA-290 exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "Published research on ARA-290 spans neuropathic and inflammatory research models, with particular interest in its proposed activity at the innate repair receptor independent of classical erythropoietin receptor signaling. It is frequently referenced alongside other inflammation-research compounds, such as KPV, in literature comparing distinct anti-inflammatory signaling pathways.",
    ],
    testingNote:
      "Every ARA-290 lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized ARA-290 should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is ARA-290?",
        answer:
          "ARA-290 is a synthetic peptide derived from a non-erythropoietic region of erythropoietin, studied for tissue-protective signaling through the innate repair receptor.",
      },
      {
        question: "Does ARA-290 affect red blood cell production like EPO?",
        answer:
          "No — it is specifically designed from the non-erythropoietic region of the EPO molecule, and research interest centers on tissue-protective signaling rather than erythropoietic activity.",
      },
      {
        question: "What purity standard does this ARA-290 meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is ARA-290 approved for human or veterinary use?",
        answer:
          "No. ARA-290 is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  kpv: {
    overview: [
      "KPV is a tripeptide corresponding to the C-terminal end of alpha-melanocyte-stimulating hormone (alpha-MSH). Despite its small size, it has been studied for anti-inflammatory and antimicrobial activity independent of alpha-MSH's pigmentation-related effects, making it a frequent subject of gut-inflammation and immune-signaling research.",
      "Genesis Genetics supplies KPV exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "KPV research is concentrated in inflammatory bowel and immune-modulation models, where it has been studied for its proposed ability to inhibit pro-inflammatory cytokine signaling (such as NF-κB pathway activity) at a much smaller molecular size than the full alpha-MSH peptide. It is frequently referenced alongside other inflammation-research compounds such as ARA-290.",
    ],
    testingNote:
      "Every KPV lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized KPV should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is KPV?",
        answer:
          "KPV is a tripeptide derived from the C-terminus of alpha-MSH, studied for anti-inflammatory and antimicrobial activity in immune and gut-inflammation research models.",
      },
      {
        question: "Does KPV affect pigmentation like alpha-MSH?",
        answer:
          "Research interest in KPV centers on its anti-inflammatory activity rather than the pigmentation-related effects associated with the full alpha-MSH peptide.",
      },
      {
        question: "What purity standard does this KPV meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is KPV approved for human or veterinary use?",
        answer:
          "No. KPV is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  nad: {
    overview: [
      "NAD+ (nicotinamide adenine dinucleotide) is a coenzyme present in every living cell, central to energy metabolism and to the activity of sirtuins — a class of proteins linked to cellular stress resistance and aging-related research. NAD+ levels are observed to decline with age across multiple tissue types, which has driven substantial research interest in NAD+ supplementation and precursor compounds.",
      "Genesis Genetics supplies NAD+ exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "NAD+ research spans mitochondrial function, sirtuin activation, and cellular-aging models, frequently overlapping with research on other Longevity- and Mitochondrial-category compounds such as SS-31 and MOTS-c. Because NAD+ is a coenzyme rather than a receptor-targeted signaling peptide, much of the literature focuses on its role as a metabolic substrate rather than a single defined mechanism.",
    ],
    testingNote:
      "Every NAD+ lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "NAD+ is notably light- and temperature-sensitive; store lyophilized material frozen and protected from light, and keep reconstituted solution refrigerated, used promptly, and shielded from light exposure.",
    faqs: [
      {
        question: "What is NAD+?",
        answer:
          "NAD+ is a coenzyme found in all living cells, central to energy metabolism and sirtuin signaling, and a frequent subject of cellular-aging and mitochondrial research.",
      },
      {
        question: "Why is NAD+ described as light-sensitive?",
        answer:
          "NAD+ is known to degrade more readily on exposure to light and heat than many peptides, which is why storage and handling guidance for it is more conservative than for most other compounds in our catalog.",
      },
      {
        question: "What purity standard does this NAD+ meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is NAD+ approved for human or veterinary use?",
        answer:
          "No. NAD+ is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  "5-amino-1mq": {
    overview: [
      "5-Amino-1MQ is a small-molecule inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme involved in cellular energy metabolism and implicated in adipocyte (fat cell) regulation research. Unlike most products in our catalog, it is a small molecule rather than a peptide, which is reflected in its different storage and handling profile.",
      "Genesis Genetics supplies 5-Amino-1MQ exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "Research on 5-Amino-1MQ centers on NNMT's role in cellular NAD+/SAM metabolism and its downstream effects on adipocyte and metabolic signaling, frequently discussed alongside other metabolic-research compounds such as AOD9604 and Retatrutide, despite acting through an entirely distinct enzymatic mechanism.",
    ],
    testingNote:
      "Every 5-Amino-1MQ lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "As a small molecule rather than a peptide, 5-Amino-1MQ is generally more stable at room temperature than lyophilized peptides, but should still be stored in a cool, dry, dark location to preserve potency.",
    faqs: [
      {
        question: "What is 5-Amino-1MQ?",
        answer:
          "5-Amino-1MQ is a small-molecule NNMT inhibitor studied in metabolic and adipocyte-regulation research, distinct from the peptides elsewhere in our catalog.",
      },
      {
        question: "Does 5-Amino-1MQ need to be reconstituted like a peptide?",
        answer:
          "Reconstitution requirements depend on the specific research protocol; as a small molecule it behaves differently from lyophilized peptides — consult your protocol and the product's Certificate of Analysis for specifics.",
      },
      {
        question: "What purity standard does this product meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is this product approved for human or veterinary use?",
        answer:
          "No. 5-Amino-1MQ is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  aod9604: {
    overview: [
      "AOD9604 is a modified fragment of the human growth hormone molecule, corresponding to amino acids 176–191 — the region of the GH molecule associated with lipolytic (fat-metabolizing) activity, isolated from the region responsible for GH's broader growth-promoting effects. This narrower focus has made it a frequent subject of fat-metabolism research distinct from full-length GH or GH secretagogue research.",
      "Genesis Genetics supplies AOD9604 exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "AOD9604 research centers on lipolysis and adipocyte metabolism, often in studies designed to isolate fat-metabolizing activity from the growth-related effects of the full GH molecule. It is frequently discussed alongside other metabolic-research compounds such as 5-Amino-1MQ and Retatrutide, each studied through distinct metabolic pathways.",
    ],
    testingNote:
      "Every AOD9604 lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized AOD9604 should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is AOD9604?",
        answer:
          "AOD9604 is a modified fragment of human growth hormone (amino acids 176–191), studied specifically for lipolytic activity isolated from GH's broader growth-promoting effects.",
      },
      {
        question: "Does AOD9604 behave like full growth hormone in research models?",
        answer:
          "No — it was specifically developed to isolate the fat-metabolizing region of the GH molecule, and research on it is framed around that narrower lipolytic activity rather than GH's broader effects.",
      },
      {
        question: "What purity standard does this AOD9604 meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is AOD9604 approved for human or veterinary use?",
        answer:
          "No. AOD9604 is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  "mots-c": {
    overview: [
      "MOTS-c is a peptide encoded within mitochondrial DNA rather than the nuclear genome, distinguishing it from most peptides studied in metabolic research. It is classified as a mitochondrial-derived peptide (MDP) and has drawn research interest as a potential signaling link between mitochondrial function and broader cellular metabolic regulation, including research into exercise-related metabolic adaptation.",
      "Genesis Genetics supplies MOTS-c exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "MOTS-c research spans mitochondrial-nuclear communication, AMPK pathway signaling, and metabolic-adaptation models, often discussed alongside other mitochondrial- and longevity-research compounds such as SS-31 and NAD+. Its mitochondrial origin makes it a frequent reference point in literature examining how mitochondria influence whole-cell metabolic signaling.",
    ],
    testingNote:
      "Every MOTS-c lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized MOTS-c should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is MOTS-c?",
        answer:
          "MOTS-c is a mitochondrial-derived peptide, encoded in mitochondrial rather than nuclear DNA, studied for its proposed role in metabolic signaling and exercise-related adaptation research.",
      },
      {
        question: "How is MOTS-c different from other metabolic peptides?",
        answer:
          "Its mitochondrial genetic origin sets it apart from nuclear-encoded peptides, and research on it often focuses specifically on mitochondrial-nuclear signaling rather than receptor-based metabolic pathways.",
      },
      {
        question: "What purity standard does this MOTS-c meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is MOTS-c approved for human or veterinary use?",
        answer:
          "No. MOTS-c is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  retatrutide: {
    overview: [
      "Retatrutide is a synthetic peptide studied as a triple receptor agonist, engaging the GLP-1, GIP, and glucagon receptors simultaneously. This multi-receptor profile distinguishes it from single- or dual-receptor compounds in the same research area, and has made it one of the most actively published metabolic research peptides in recent literature concerning energy balance and glucose/lipid metabolism.",
      "Genesis Genetics supplies Retatrutide exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "Retatrutide research centers on combined GLP-1/GIP/glucagon receptor signaling and its downstream effects on energy expenditure, glucose handling, and lipid metabolism in research models. It is frequently discussed alongside other metabolic-research compounds such as AOD9604 and 5-Amino-1MQ, though its multi-receptor mechanism is distinct from either.",
    ],
    testingNote:
      "Every Retatrutide lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized Retatrutide should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is Retatrutide?",
        answer:
          "Retatrutide is a synthetic peptide studied as a triple agonist of the GLP-1, GIP, and glucagon receptors, researched in the context of energy balance and metabolic regulation.",
      },
      {
        question: "How does Retatrutide differ from single-receptor GLP-1 compounds?",
        answer:
          "Its proposed triple-receptor activity (GLP-1, GIP, and glucagon) is studied as a distinct mechanism from single- or dual-receptor compounds, which is the focus of much of the recent published research interest in it.",
      },
      {
        question: "What purity standard does this Retatrutide meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is Retatrutide approved for human or veterinary use?",
        answer:
          "No. Retatrutide is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  "ss-31": {
    overview: [
      "SS-31 (also known as elamipretide) is a synthetic peptide designed to selectively bind cardiolipin, a phospholipid concentrated in the inner mitochondrial membrane. This targeted binding is the basis for its research use in mitochondrial-dysfunction and oxidative-stress models, where it has been studied for its proposed role in stabilizing mitochondrial membrane structure.",
      "Genesis Genetics supplies SS-31 exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "SS-31 research is concentrated in mitochondrial biology — oxidative stress, membrane integrity, and bioenergetics models — often alongside other mitochondrial- and metabolic-research compounds such as MOTS-c and NAD+. Its cardiolipin-targeting mechanism is frequently cited as a point of distinction from peptides that act through cell-surface receptor signaling.",
    ],
    testingNote:
      "Every SS-31 lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized SS-31 should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is SS-31?",
        answer:
          "SS-31 (elamipretide) is a synthetic peptide that selectively binds cardiolipin in the inner mitochondrial membrane, studied in oxidative-stress and mitochondrial-dysfunction research.",
      },
      {
        question: "Why does cardiolipin binding matter for research purposes?",
        answer:
          "Cardiolipin is concentrated in the inner mitochondrial membrane and is implicated in membrane stability; SS-31's targeted binding to it is the basis for most of the mitochondrial research built around this compound.",
      },
      {
        question: "What purity standard does this SS-31 meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is SS-31 approved for human or veterinary use?",
        answer:
          "No. SS-31 is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  semax: {
    overview: [
      "Semax is a synthetic heptapeptide analog of ACTH(4-10), a fragment of adrenocorticotropic hormone modified to resist rapid enzymatic breakdown. Originally developed in Russia, it has an extensive body of published research examining neuroprotective and cognitive-research endpoints, distinguishing it from most peptides in this catalog that target metabolic or tissue-repair pathways.",
      "Genesis Genetics supplies Semax exclusively for laboratory and research applications. It is not sold, marketed, or intended for human or veterinary use.",
    ],
    researchContext: [
      "Semax research centers on neurotrophic factor expression (including BDNF) and central nervous system signaling in animal and in-vitro models, an area distinct from the metabolic and tissue-repair research that dominates much of the rest of our catalog. Its long research history outside the U.S. has produced a comparatively large published literature base for a synthetic peptide of its kind.",
    ],
    testingNote:
      "Every Semax lot is verified by HPLC for identity and purity before release, documented on the included lot-specific Certificate of Analysis.",
    storageNote:
      "Lyophilized Semax should be stored refrigerated or frozen and protected from light prior to reconstitution; once reconstituted, keep refrigerated and use within a limited stability window.",
    faqs: [
      {
        question: "What is Semax?",
        answer:
          "Semax is a synthetic ACTH(4-10) analog originally developed in Russia, studied extensively in neuroprotective and cognitive-research contexts.",
      },
      {
        question: "Is Semax studied the same way as the metabolic peptides in this catalog?",
        answer:
          "No — Semax research centers on central nervous system and neurotrophic signaling, a distinct research area from the metabolic and tissue-repair pathways studied for most other compounds here.",
      },
      {
        question: "What purity standard does this Semax meet?",
        answer:
          "Each lot is independently tested via HPLC and released only above a 99% purity threshold, documented on the included Certificate of Analysis.",
      },
      {
        question: "Is Semax approved for human or veterinary use?",
        answer:
          "No. Semax is sold strictly for laboratory and research use and is not approved or intended for human or veterinary administration.",
      },
    ],
  },

  "bac-water": {
    overview: [
      "Bacteriostatic water is USP-grade sterile water containing approximately 0.9% benzyl alcohol as a preservative, which inhibits bacterial growth across multiple uses from the same vial. It is not a research peptide itself, but the standard diluent used to reconstitute lyophilized (freeze-dried) peptides into a liquid form suitable for laboratory use.",
      "Genesis Genetics supplies bacteriostatic water exclusively for laboratory and research applications, as a reconstitution aid for the peptides in our catalog.",
    ],
    researchContext: [
      "Because benzyl alcohol is the active preservative, bacteriostatic water is generally distinguished in research protocols from plain sterile water (which has no preservative and is intended for single-use reconstitution only). Most peptides in our catalog list bacteriostatic water as a curated companion product specifically for this reason.",
    ],
    testingNote:
      "Each lot is verified to USP-grade sterility and purity standards before release, documented on the included Certificate of Analysis.",
    storageNote:
      "Store at room temperature away from direct light. Once a vial is opened, most protocols call for use within roughly 28 days, after which the preservative's effectiveness can no longer be assured — discard and use a fresh vial after that window.",
    faqs: [
      {
        question: "What is bacteriostatic water used for?",
        answer:
          "It is used to reconstitute lyophilized (freeze-dried) peptides into a liquid form, and its benzyl alcohol preservative allows a single vial to be used for multiple reconstitutions without re-sterilizing.",
      },
      {
        question: "How is it different from plain sterile water?",
        answer:
          "Plain sterile water has no antimicrobial preservative and is intended for a single use; bacteriostatic water's benzyl alcohol content inhibits bacterial growth across repeated draws from the same vial.",
      },
      {
        question: "How long does an opened vial last?",
        answer:
          "Most laboratory protocols treat an opened vial as usable for about 28 days before the preservative's effectiveness can no longer be assured. Follow your own protocol's guidance.",
      },
      {
        question: "Is bacteriostatic water approved for human injection?",
        answer:
          "No. As sold by Genesis Genetics, bacteriostatic water is supplied strictly for laboratory and research use, not for human or veterinary administration.",
      },
    ],
  },
};
