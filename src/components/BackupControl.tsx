import React, { useRef, useState } from "react";
import { Download, Upload, Check, AlertCircle, FileJson, Info } from "lucide-react";
import { Group, VideoCard, BackupData } from "../types";

interface BackupControlProps {
  groups: Group[];
  cards: VideoCard[];
  onImportBackup: (importedGroups: Group[], importedCards: VideoCard[], mode: "merge" | "overwrite") => void;
}

export default function BackupControl({
  groups,
  cards,
  onImportBackup,
}: BackupControlProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<BackupData | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 1. Export Data
  const handleExport = () => {
    try {
      const backup: BackupData = {
        version: "1.0",
        groups,
        cards,
        exportedAt: Date.now(),
      };

      const dataStr = JSON.stringify(backup, null, 2);
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const dateStr = new Date().toISOString().slice(0, 10);
      const exportFileDefaultName = `backup-curadoria-youtube-${dateStr}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      setSuccessMsg("Backup exportado com sucesso para download!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      console.error(err);
      setImportError("Ocorreu um erro ao gerar o arquivo de backup.");
    }
  };

  // 2. Validate & parse uploaded JSON
  const processJsonFile = (file: File) => {
    setImportError(null);
    setSuccessMsg(null);
    setParsedData(null);

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      setImportError("Por favor, selecione um arquivo válido em formato JSON (.json).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const json = JSON.parse(text);

        // Validation schema check
        if (!json || typeof json !== "object") throw new Error("JSON inválido.");
        if (!Array.isArray(json.groups) || !Array.isArray(json.cards)) {
          throw new Error("Formato inválido. O arquivo de backup deve conter listas de 'groups' e 'cards'.");
        }

        setParsedData({
          version: json.version || "1.0",
          groups: json.groups,
          cards: json.cards,
          exportedAt: json.exportedAt || Date.now(),
        });
      } catch (err: any) {
        setImportError(err.message || "Erro ao processar o arquivo. Certifique-se de que é um JSON de backup válido.");
      }
    };
    reader.onerror = () => {
      setImportError("Falha na leitura física do arquivo.");
    };
    reader.readAsText(file);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processJsonFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processJsonFile(e.target.files[0]);
    }
  };

  const handleApplyImport = (mode: "merge" | "overwrite") => {
    if (!parsedData) return;
    onImportBackup(parsedData.groups, parsedData.cards, mode);
    
    setSuccessMsg(
      mode === "merge" 
        ? "Dados importados e mesclados com sucesso!" 
        : "Dados restaurados completamente (antigos substituídos)!"
    );
    setParsedData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="bg-white dark:bg-[#334155] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-lg">
          <FileJson className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
            Backup e Portabilidade
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Exporte toda a sua curadoria em formato portátil ou restaure dados salvos anteriormente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Export Column */}
        <div className="border border-slate-200/60 dark:border-white/5 p-5 rounded-xl bg-slate-50/20 dark:bg-white/[0.01] flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5 mb-1.5">
              <Download className="h-4 w-4 text-red-500" />
              Exportar dados
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Gera um arquivo <strong className="font-mono text-slate-700 dark:text-slate-300">.json</strong> seguro contendo todos os seus grupos ({groups.length}), links de vídeos ({cards.length}), anotações, cores temáticas, likes e classificações.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-3 px-4 rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            id="backup-export-btn"
          >
            <Download className="h-4 w-4" />
            Salvar Cópia Local (JSON)
          </button>
        </div>

        {/* Import Column */}
        <div className="border border-slate-200/60 dark:border-white/5 p-5 rounded-xl bg-slate-50/20 dark:bg-white/[0.01] flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5 mb-1.5">
              <Upload className="h-4 w-4 text-red-500" />
              Importar / Restaurar
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Arraste o arquivo ou clique abaixo para ler uma cópia do backup.
            </p>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                dragActive 
                  ? "border-red-500 bg-red-500/10" 
                  : "border-slate-200 dark:border-white/10 hover:border-red-500 bg-slate-50/50 dark:bg-black/30"
              }`}
              id="backup-drop-zone"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-5 w-5 text-slate-400 dark:text-slate-500 mx-auto mb-1.5" />
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Arraste o JSON ou clique para selecionar
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation of Loaded Data / Choices */}
      {parsedData && (
        <div 
          className="mt-6 p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl space-y-4 animate-in slide-in-from-bottom-2 duration-300"
          id="backup-confirmation-box"
        >
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-amber-500">
                Arquivo de Backup Analisado com Sucesso!
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Contém <strong className="text-slate-800 dark:text-slate-200">{parsedData.groups.length} grupos</strong> e{" "}
                <strong className="text-slate-800 dark:text-slate-200">{parsedData.cards.length} vídeos</strong>. Como deseja carregar estes dados em sua biblioteca atual?
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleApplyImport("merge")}
              className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold text-xs py-2.5 px-4 rounded-md transition-all shadow-xs cursor-pointer"
              id="backup-import-merge"
            >
              🤝 Mesclar (Manter atuais + adicionar novos)
            </button>
            <button
              onClick={() => handleApplyImport("overwrite")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 px-4 rounded-md transition-all shadow-xs cursor-pointer"
              id="backup-import-overwrite"
            >
              ⚠️ Sobrescrever (Apagar biblioteca atual e restaurar)
            </button>
          </div>
        </div>
      )}

      {/* Action status feedbacks */}
      {importError && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-md flex gap-2.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
          <span>{importError}</span>
        </div>
      )}

      {successMsg && (
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-md flex gap-2.5 text-xs text-emerald-600 dark:text-emerald-400">
          <Check className="h-4.5 w-4.5 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
}
