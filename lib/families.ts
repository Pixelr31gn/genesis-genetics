export type PeptideFamily = {
  slug: string;
  name: string;
  meta_description: string;
  tagline: string;
  overview: string[];
  research_themes: { title: string; body: string }[];
  member_slugs: string[];
  faq: { question: string; answer: string }[];
};

export const FAMILIES: PeptideFamily[] = [
  {
    slug: "tissue-repair-peptides",
    name: "Tissue Repair Peptides",
    meta_description:
      "Tissue repair peptides — including BPC-157, TB-500, and GHK-Cu — are among the most studied research compounds in wound healing, angiogenesis, and structural protein synthesis. Explore the science behind this peptide class.",
    tagline: "Structural Protein Synthesis · Angiogenesis · Wound Healing",
    overview: [
      "The tissue repair peptide family groups research compounds that appear with high frequency in preclinical literature concerning wound closure, angiogenesis, tendon-to-bone repair, and extracellular matrix (ECM) remodeling. The three compounds in this family at Genesis Genetics — BPC-157, TB-500, and GHK-Cu — have distinct molecular origins and mechanisms, but their overlapping research contexts make them natural companions in this compound class.",
      "BPC-157 is a 15-amino-acid sequence derived from human gastric juice that has been studied for gastrointestinal mucosal protection, tendon healing, and NO-system-mediated angiogenesis. TB-500 (Thymosin Beta-4) is a 43-amino-acid peptide that regulates actin dynamics and has been studied in cardiac, corneal, and tendon repair models. GHK-Cu is a copper-binding tripeptide naturally present in human plasma that promotes collagen and elastin synthesis and activates superoxide dismutase.",
      "Researchers in tissue biology, wound healing models, and regenerative medicine research will find that these compounds address complementary nodes of the repair cascade — BPC-157 targeting the early angiogenic and inflammatory phase, TB-500 addressing cellular migration and ECM organization, and GHK-Cu driving structural protein synthesis in the remodeling phase. This makes them frequently co-studied in experimental designs requiring comprehensive coverage of the wound healing response.",
    ],
    research_themes: [
      {
        title: "Angiogenesis and Vascular Repair",
        body: "Both BPC-157 and TB-500 have documented pro-angiogenic effects in preclinical models. BPC-157 upregulates VEGFR2 phosphorylation and promotes endothelial tube formation through NO-cGMP pathway activation. TB-500's actin-sequestering function promotes endothelial cell migration via ILK-Akt signaling. Researchers studying blood vessel formation, ischemic tissue recovery, or endothelial biology will find these compounds valuable experimental tools.",
      },
      {
        title: "Extracellular Matrix Synthesis",
        body: "GHK-Cu is the principal ECM-targeting compound in this family, with extensive literature demonstrating upregulation of collagen I, collagen III, glycosaminoglycans, and lysyl oxidase activity in fibroblast cultures and animal wound models. Its microarray studies showing effects on over 4,000 genes — with prominent ECM synthesis pathways — make it a comprehensive tool for structural tissue biology research.",
      },
      {
        title: "Gastrointestinal and Mucosal Research",
        body: "BPC-157's derivation from gastric juice protein reflects its core research applications in GI biology. Studies in rodent models of NSAID-induced gastric lesions, DSS colitis, and intestinal anastomosis repair have consistently documented mucosal protective effects. Its resistance to gastric acid degradation makes it a useful tool for studying intestinal epithelial restitution without the confound of peptide destruction in the gut lumen.",
      },
    ],
    member_slugs: ["bpc-157", "tb-500", "ghk-cu"],
    faq: [
      {
        question: "Are tissue repair peptides approved for human use?",
        answer:
          "No. BPC-157, TB-500, and GHK-Cu are all sold for laboratory and research purposes only and are not approved by the FDA or any equivalent regulatory body for human or veterinary therapeutic use. All research involving these compounds should be conducted in appropriate preclinical model systems.",
      },
      {
        question: "How do BPC-157 and TB-500 differ mechanistically?",
        answer:
          "BPC-157 primarily acts through the nitric oxide system and FAK-paxillin signaling, with particularly strong effects in gastrointestinal tissue. TB-500 primarily acts through actin sequestration and ILK-Akt signaling, with a broader range of tissues studied including cardiac, skeletal muscle, and corneal models. Researchers often study both in musculoskeletal repair contexts despite these mechanistic differences.",
      },
      {
        question: "What makes GHK-Cu different from the other tissue repair peptides?",
        answer:
          "GHK-Cu is a small tripeptide that acts primarily as a metal chelator and direct stimulator of structural protein synthesis. Its copper component is functionally important — it participates in redox chemistry and activates lysyl oxidase, which cross-links collagen and elastin fibers. BPC-157 and TB-500 are primarily signaling molecules affecting cell behavior, while GHK-Cu is more directly involved in the biochemistry of matrix construction.",
      },
    ],
  },
  {
    slug: "growth-hormone-secretagogues",
    name: "Growth Hormone Secretagogues",
    meta_description:
      "Growth hormone secretagogues — Ipamorelin, CJC-1295 with DAC, Tesamorelin, and AOD9604 — target the GH/IGF-1 axis through GHRH receptor and GHSR-1a receptor mechanisms. Explore this peptide class for GH axis research.",
    tagline: "GHRH Receptor · GH/IGF-1 Axis · GH Secretagogue Research",
    overview: [
      "The growth hormone secretagogue (GHS) family encompasses research compounds that stimulate or mimic the actions of endogenous hormones governing growth hormone release. At Genesis Genetics, this family includes Ipamorelin (a selective GHSR-1a agonist), CJC-1295 with DAC (a long-acting GHRH receptor agonist), Tesamorelin (a GHRH(1-44) analog with clinical precedent), and AOD9604 (an hGH C-terminal fragment targeting fat metabolism without GH receptor binding).",
      "These compounds occupy distinct positions in the GH axis pharmacology space. Ipamorelin acts downstream of the hypothalamus at the GHSR-1a receptor on pituitary somatotrophs, mimicking ghrelin's GH-releasing effect with high selectivity. CJC-1295 with DAC and Tesamorelin act upstream by mimicking GHRH at the GHRH receptor. AOD9604 stands apart as a fragment of mature hGH that does not bind the GH receptor but retains lipolytic activity through β-adrenergic and PPAR-γ pathways.",
      "For researchers designing GH axis studies, the pharmacokinetic diversity of this family is particularly useful: Ipamorelin has a short half-life suitable for pulsatile dosing studies, CJC-1295 with DAC has a ~7-day half-life for sustained axis activation studies, and Tesamorelin falls between these extremes with established human pharmacodynamic data from clinical trials. AOD9604 enables study of GH-related fat metabolism without the confounds of IGF-1 elevation.",
    ],
    research_themes: [
      {
        title: "Pituitary Somatotroph Biology",
        body: "Ipamorelin's high selectivity for GHSR-1a without co-activation of ACTH or prolactin axes makes it an ideal pharmacological probe for isolated somatotroph biology. Research comparing ipamorelin, GHRP-2, and GHRP-6 has been instrumental in characterizing GHSR-1a receptor subtypes and downstream signaling pathways. Both GHSR-1a and GHRHR agonists in this family provide complementary access points for studying pituitary GH secretion.",
      },
      {
        title: "Pharmacokinetic Engineering in Peptide Research",
        body: "The comparison between Tesamorelin (~30 min half-life), Ipamorelin (~2 hr half-life), and CJC-1295 with DAC (~7 day half-life) in terms of GH release kinetics offers researchers a natural pharmacokinetic ladder for studying how GH pulse frequency versus mean GH concentration differentially affects downstream IGF-1 elevation, tissue growth, and metabolic outcomes.",
      },
      {
        title: "Adipose Tissue and Body Composition",
        body: "AOD9604 and Tesamorelin have both been studied in the context of visceral adipose reduction, through distinct mechanisms. Tesamorelin achieves this indirectly through elevated GH and IGF-1 acting on GH-receptor-rich visceral adipocytes. AOD9604 achieves it directly through β3-adrenergic and PPAR-γ pathways independent of GH receptor binding. This mechanistic difference makes the two compounds useful controls for one another in adipocyte biology research.",
      },
    ],
    member_slugs: ["ipamorelin", "cjc-1295-with-dac", "tesamorelin", "aod9604"],
    faq: [
      {
        question: "What distinguishes a GHRH analog from a GHSR agonist for research purposes?",
        answer:
          "GHRH analogs (CJC-1295, Tesamorelin) act on the GHRH receptor on pituitary somatotrophs, mimicking the hypothalamic signal. GHSR-1a agonists like Ipamorelin mimic ghrelin's action on the same somatotrophs but through a different receptor. They share the downstream outcome of GH release but have distinct binding sites, selectivity profiles, and co-activation patterns. Combining both classes in research allows study of additive or synergistic effects on GH secretion.",
      },
      {
        question: "Why doesn't AOD9604 elevate IGF-1 like other GH-related peptides?",
        answer:
          "AOD9604 is a C-terminal fragment of hGH (residues 176-191) that lacks the N-terminal domain required to bind the GH receptor (GHR). Since IGF-1 production requires GHR binding in the liver, AOD9604 does not trigger the hepatic IGF-1 response. Its lipolytic effects are mediated through β3-adrenergic receptors on adipocytes, making it useful for studying fat metabolism independently of the GH/IGF-1 axis.",
      },
      {
        question: "Are these compounds approved for research use in animal models?",
        answer:
          "These compounds are sold for laboratory and research applications only, and their use in animal research is subject to applicable institutional animal care and use committee (IACUC) protocols at the investigator's institution. They are not approved for human or veterinary therapeutic use.",
      },
    ],
  },
  {
    slug: "mitochondrial-peptides",
    name: "Mitochondrial Peptides & Metabolic Compounds",
    meta_description:
      "Mitochondrial peptides and metabolic compounds — SS-31, MOTS-c, NAD+, and 5-Amino-1MQ — target fundamental pathways of cellular energy metabolism, biogenesis, and metabolic regulation. Explore this compound class for mitochondrial research.",
    tagline: "Bioenergetics · AMPK · Sirtuin Activation · Cardiolipin",
    overview: [
      "The mitochondrial and metabolic compound family groups research tools that target cellular energy metabolism at its most fundamental levels: the electron transport chain, cardiolipin membrane dynamics, mitochondrial-derived peptide signaling, NAD+-dependent enzyme regulation, and nicotinamide methylation pathways. These compounds have collectively become central tools in aging biology, metabolic disease, and bioenergetics research.",
      "SS-31 (Elamipretide) concentrates in the inner mitochondrial membrane and protects cardiolipin from oxidative damage, stabilizing ETC supercomplexes and improving ATP synthesis efficiency. MOTS-c is a mitochondrially-encoded peptide that signals from mitochondria to the nucleus to activate AMPK and reprogram metabolic gene expression. NAD+ is the universal cellular electron carrier and substrate for sirtuin deacetylases and PARP repair enzymes. 5-Amino-1MQ inhibits NNMT, an enzyme that depletes nicotinamide substrate for NAD+ synthesis and impairs the methionine cycle in obese adipose tissue.",
      "These four compounds address complementary nodes of the same metabolic network: SS-31 at the mitochondrial inner membrane, MOTS-c at the mitochondrion-to-nucleus communication axis, NAD+ at the substrate level for energy and regulatory enzymes, and 5-Amino-1MQ at the upstream biosynthesis bottleneck that determines NAD+ availability in metabolically stressed tissues.",
    ],
    research_themes: [
      {
        title: "Cardiolipin and ETC Supercomplex Biology",
        body: "SS-31's mechanism of action — binding cardiolipin in the inner mitochondrial membrane to protect against oxidative damage and stabilize ETC respirasomes — has made it a model compound for studying how mitochondrial membrane lipid composition affects bioenergetic efficiency. Research with SS-31 in ischemia-reperfusion models, heart failure models, and aging skeletal muscle has provided mechanistic insights into how cardiolipin peroxidation contributes to mitochondrial dysfunction across multiple disease contexts.",
      },
      {
        title: "Mitochondrial-Derived Peptides and Retrograde Signaling",
        body: "MOTS-c was one of the first peptides discovered to be encoded within the mitochondrial genome rather than the nuclear genome, establishing the concept of mitochondria as active endocrine organs rather than passive energy factories. Its signaling pathway — inhibiting DHFR in the folate cycle to accumulate AICAR and activate AMPK — and its nuclear entry during metabolic stress to regulate Nrf2/ARE gene expression represent a fundamentally new type of organelle-to-nucleus crosstalk that continues to be an active research frontier.",
      },
      {
        title: "NAD+ Biology and SIRT/PARP Regulation",
        body: "NAD+ availability is a rate-limiting factor for both sirtuin deacetylases and PARP DNA repair enzymes. The age-associated decline in NAD+ levels has positioned NAD+ supplementation and restoration strategies as central topics in longevity research. 5-Amino-1MQ addresses NAD+ availability from the upstream side by inhibiting NNMT-mediated nicotinamide consumption, while direct NAD+ supplementation addresses the availability from the substrate side. Research combining these approaches provides mechanistic data on the relative importance of each bottleneck.",
      },
    ],
    member_slugs: ["ss-31", "mots-c", "nad", "5-amino-1mq"],
    faq: [
      {
        question: "How does SS-31 accumulate in the mitochondria?",
        answer:
          "Unlike most mitochondria-targeted compounds that use lipophilic cations to leverage the mitochondrial membrane potential, SS-31 uses an unusual mechanism: its alternating cationic and aromatic amino acids allow it to interact with the negatively charged cardiolipin phosphate head groups directly in the inner mitochondrial membrane. This cardiolipin affinity drives approximately 1,000-fold concentration of SS-31 in the IMM relative to cytoplasm.",
      },
      {
        question: "What makes MOTS-c different from nuclear-encoded metabolic peptides?",
        answer:
          "MOTS-c is translated from a small open reading frame within the mitochondrial 12S rRNA gene — meaning its DNA sequence lives in mitochondria, not in chromosomal DNA. This makes it part of a new class called mitochondrial-derived peptides (MDPs). Its signaling pathway also has unique features: it enters the nucleus during metabolic stress and activates antioxidant response elements (ARE) through Nrf2, creating a direct communication channel from the organelle to the genome.",
      },
      {
        question: "Why study 5-Amino-1MQ alongside NAD+?",
        answer:
          "These compounds address the same NAD+ availability problem from different angles. NAD+ supplementation directly restores the coenzyme. 5-Amino-1MQ inhibits NNMT, which consumes nicotinamide — a precursor to NAD+ — in a futile methylation reaction that is upregulated in obese adipose tissue. Studying them together can reveal whether the bottleneck for NAD+ availability in a given tissue is upstream precursor supply (NNMT-addressable) or direct cofactor depletion (NAD+-addressable).",
      },
    ],
  },
  {
    slug: "neuropeptides",
    name: "Neuropeptides & CNS Research Compounds",
    meta_description:
      "Neuropeptides at Genesis Genetics — Semax, KPV, and ARA-290 — target BDNF upregulation, melanocortin anti-inflammatory pathways, and innate repair receptor neuroprotection. Explore this family for CNS and inflammatory research.",
    tagline: "BDNF · Melanocortin Receptors · Neuroprotection · Neuroinflammation",
    overview: [
      "The neuropeptide and CNS research compound family at Genesis Genetics groups compounds whose primary research applications involve the central or peripheral nervous system, neuroinflammation, and neuroprotection. This family includes Semax (an ACTH-derived BDNF-stimulating heptapeptide), KPV (the anti-inflammatory C-terminal tripeptide of α-MSH), and ARA-290 (cibinetide, a selective Innate Repair Receptor agonist originally derived from the EPO structure).",
      "Despite their different molecular origins, these three compounds converge on overlapping areas of research interest. All three have documented anti-inflammatory properties relevant to neuroinflammation. Semax and ARA-290 have both been studied in models of nerve damage and neuropathy. KPV and Semax both modulate melanocortin receptor pathways — Semax through its ACTH-derived sequence and KPV as a direct α-MSH fragment — making their co-study informative for understanding melanocortin biology in the gut and CNS.",
      "Investigators in neuroinflammation research, neuroprotection models, peripheral neuropathy studies, and neurotrophic factor biology will find these compounds useful for different aspects of the same experimental questions. Semax provides strong BDNF-induction capability. ARA-290 provides selective IRR/EPO receptor biology without hematopoietic confounds. KPV provides gut-stable, MC receptor-mediated anti-inflammatory activity in GI and systemic contexts.",
    ],
    research_themes: [
      {
        title: "BDNF and Neurotrophic Factor Research",
        body: "Semax's most robustly documented preclinical effect is stimulation of BDNF and NGF expression in the hippocampus and frontal cortex following systemic or intranasal administration in rodents. BDNF's role in synaptic plasticity, long-term potentiation, memory consolidation, and neuroprotection against excitotoxicity makes Semax a valuable tool for studying how increasing endogenous BDNF levels affects cognitive function and neuronal survival in experimental models.",
      },
      {
        title: "Melanocortin Receptor-Mediated Anti-Inflammation",
        body: "KPV and Semax both interact with melanocortin receptor systems that mediate anti-inflammatory signaling. KPV (the C-terminal tripeptide of α-MSH) acts primarily through MC1R and MC3R, suppressing NF-κB activation and reducing pro-inflammatory cytokine production in intestinal epithelial and immune cells. Semax modulates these same receptors to a lesser degree through its ACTH-derived sequence. Research comparing these compounds enables study of α-MSH's anti-inflammatory properties with different receptor selectivity profiles.",
      },
      {
        title: "Innate Repair Receptor Biology and Neuropathy",
        body: "ARA-290's selective activation of the EPOR/βCR Innate Repair Receptor provides a unique research tool for studying the tissue-protective arm of EPO signaling without the hematopoietic effects of erythropoietin itself. This is particularly relevant for peripheral neuropathy research, where IRR expression on small sensory fibers has been documented and where clinical data from sarcoidosis-related neuropathy trials has shown measurable changes in corneal nerve fiber density — a validated structural endpoint for small fiber neuropathy assessment.",
      },
    ],
    member_slugs: ["semax", "kpv", "ara-290"],
    faq: [
      {
        question: "Is Semax the same as Selank?",
        answer:
          "No. Semax and Selank are distinct synthetic peptides from the same Russian research tradition. Semax is derived from ACTH(4-7) with a C-terminal PGP extension; its primary documented effects are BDNF upregulation and neuroprotection. Selank is derived from the immunomodulatory peptide tuftsin with additional stabilizing residues; its primary documented effects involve anxiolytic activity and GABA system modulation. They are sometimes studied together but are separate compounds.",
      },
      {
        question: "What is the Innate Repair Receptor and why does ARA-290 target it?",
        answer:
          "The Innate Repair Receptor (IRR) is a heterodimer of the erythropoietin receptor (EPOR) and the beta-common receptor (βCR). It is expressed on non-hematopoietic tissues including neurons, macrophages, and endothelial cells. ARA-290 was engineered to bind this heterodimer selectively without activating the EPOR homodimer, which drives red blood cell production. This selectivity allows study of EPO's tissue-protective signaling independently of its hematopoietic effects.",
      },
      {
        question: "How does KPV protect the gut mucosa?",
        answer:
          "KPV's gut-protective effects involve direct anti-inflammatory signaling on intestinal epithelial cells through MC1R and MC3R receptors, leading to cAMP elevation and NF-κB pathway inhibition. This reduces production of pro-inflammatory cytokines (TNF-α, IL-6, IL-1β) and adhesion molecules (ICAM-1) in the intestinal wall. KPV also appears to promote tight junction protein expression, potentially contributing to epithelial barrier integrity in colitis models.",
      },
    ],
  },
  {
    slug: "glp-1-analogs",
    name: "GLP-1 Analogs & Incretin Compounds",
    meta_description:
      "GLP-1 analogs and incretin compounds at Genesis Genetics — including Retatrutide — represent the frontier of metabolic peptide research, with triple GLP-1/GIP/glucagon receptor pharmacology documented in Phase II clinical data.",
    tagline: "GLP-1R · GIPR · GCGR · Incretin Biology · Metabolic Research",
    overview: [
      "The GLP-1 analog and incretin compound family represents the most clinically active area of peptide pharmacology as of 2024, with multiple approved single- and dual-agonist drugs and pipeline triple-agonists under Phase III evaluation. At Genesis Genetics, this family is anchored by Retatrutide (LY3437943), a GLP-1/GIP/Glucagon triple receptor agonist developed by Eli Lilly whose Phase II trial data showed remarkable efficacy in obesity models.",
      "GLP-1 (glucagon-like peptide-1) is an incretin hormone released from gut L-cells in response to nutrient ingestion. Its receptor (GLP-1R) is expressed on pancreatic beta cells, CNS neurons, cardiac tissue, and adipocytes. GLP-1R agonism drives glucose-dependent insulin secretion, reduces glucagon release, slows gastric emptying, and promotes satiety via vagal and central mechanisms. The addition of GIP receptor (GIPR) agonism in tirzepatide-class compounds adds incretin-mediated insulin secretion. The further addition of glucagon receptor (GCGR) agonism in retatrutide-class compounds adds direct energy expenditure stimulation and hepatic glucose effects.",
      "Research with incretin compounds spans metabolic disease pharmacology, receptor structure-function studies, cardiovascular biology, CNS appetite regulation, and liver biology. The availability of GLP-1R agonists with increasing receptor profile complexity (mono, dual, triple) enables systematic study of additive versus synergistic receptor interactions in metabolic models.",
    ],
    research_themes: [
      {
        title: "Triple Receptor Agonism and Weight Loss Mechanisms",
        body: "Retatrutide's co-activation of GLP-1R, GIPR, and GCGR provides a research tool for studying how glucagon receptor agonism adds to the weight loss effects of dual incretin agonism. The ~17-24% body weight reduction seen in Phase II trials exceeds Phase II results for GLP-1-only and dual GLP-1/GIP agonists, suggesting synergistic rather than merely additive receptor interactions. Research with retatrutide can help determine what proportion of this additional effect comes from increased energy expenditure (GCGR-mediated) versus enhanced satiety or insulin sensitivity.",
      },
      {
        title: "Incretin Receptor Structure-Function Research",
        body: "All three receptors targeted by retatrutide (GLP-1R, GIPR, GCGR) are class B1 GPCRs with structurally related N-terminal extracellular domains. Research with mono-, dual-, and triple-agonist peptides has been instrumental in understanding the structural basis of receptor selectivity and has informed computational modeling of GPCR binding. Retatrutide's fatty acid modification (enabling ~6-day half-life via albumin binding) also makes it a useful model for studying long-acting GPCR agonist pharmacology.",
      },
      {
        title: "Hepatic Metabolism and Glucagon Receptor Biology",
        body: "The glucagon receptor component of retatrutide's pharmacology introduces hepatic glucose production and lipid metabolism effects that GLP-1-only agonists lack. GCGR agonism in the liver stimulates glycogenolysis and gluconeogenesis through cAMP/PKA pathways. In the context of obesity research, this hepatic activation appears to contribute to energy expenditure without causing diabetogenic hyperglycemia when co-administered with GLP-1R agonism — making the combination an interesting subject for studying hepatic-pancreatic glucose balance.",
      },
    ],
    member_slugs: ["retatrutide"],
    faq: [
      {
        question: "How does Retatrutide differ from semaglutide and tirzepatide?",
        answer:
          "Semaglutide is a GLP-1R mono-agonist. Tirzepatide is a dual GLP-1R/GIPR agonist. Retatrutide is a triple GLP-1R/GIPR/GCGR agonist. The glucagon receptor (GCGR) component is the critical addition in retatrutide, which is hypothesized to drive additional energy expenditure through hepatic and thermogenic mechanisms that the other two lack. This is reflected in the more pronounced weight reduction observed in retatrutide's Phase II data compared to published Phase II data for the other compounds.",
      },
      {
        question: "Is GLP-1 related to glucagon? How can agonizing both be beneficial?",
        answer:
          "GLP-1 and glucagon are both derived from the proglucagon gene but have opposing effects on blood glucose — GLP-1 stimulates insulin release (lowering glucose) while glucagon raises blood glucose. The apparent paradox of activating both is resolved by GLP-1R agonism creating a baseline insulin-sensitized state in which glucagon receptor activation drives energy expenditure without causing hyperglycemia. This insulin-glucagon balance is an active research area in metabolic pharmacology.",
      },
      {
        question: "What is Retatrutide's current regulatory status?",
        answer:
          "As of 2024, retatrutide is in Phase III clinical trials for obesity. It is not approved for human therapeutic use in any jurisdiction. It is available at Genesis Genetics for research purposes only — preclinical studies examining receptor pharmacology, metabolic pathways, or comparative incretin biology in appropriate in vitro and in vivo research models.",
      },
    ],
  },
];

export function getFamilyBySlug(slug: string): PeptideFamily | undefined {
  return FAMILIES.find((f) => f.slug === slug);
}
