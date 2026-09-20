import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  HeartPulse,
  Info,
  Leaf,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { diets, diseases, patients } from "./data";
import { getAssociatedDiets } from "./compatibility";
import type { Assignment, DietEvaluation, Patient } from "./types";

const ASSIGNMENT_STORAGE_KEY = "epc28-diet-assignment";

function getDiseaseNames(patient: Patient) {
  return patient.diseaseIds
    .map((id) => diseases.find((disease) => disease.id === id)?.name)
    .filter(Boolean)
    .join(", ");
}

function App() {
  const [patientId, setPatientId] = useState(patients[0].id);
  const [details, setDetails] = useState<DietEvaluation | null>(null);
  const [confirmation, setConfirmation] = useState<DietEvaluation | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(() => {
    const saved = localStorage.getItem(ASSIGNMENT_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Assignment) : null;
  });
  const [notice, setNotice] = useState<string | null>(null);

  const patient = patients.find((item) => item.id === patientId) ?? patients[0];
  const evaluations = useMemo(() => getAssociatedDiets(diets, patient), [patient]);
  const safeCount = evaluations.filter((evaluation) => evaluation.isSafe).length;

  useEffect(() => {
    setDetails(null);
    setConfirmation(null);
    setNotice(null);
  }, [patientId]);

  const activeAssignment =
    assignment?.patientId === patient.id
      ? diets.find((diet) => diet.id === assignment.dietId)
      : undefined;

  const confirmAssignment = () => {
    if (!confirmation?.isSafe) return;

    const nextAssignment: Assignment = {
      patientId: patient.id,
      dietId: confirmation.diet.id,
      assignedAt: new Date().toISOString(),
    };
    localStorage.setItem(ASSIGNMENT_STORAGE_KEY, JSON.stringify(nextAssignment));
    setAssignment(nextAssignment);
    setNotice(`${confirmation.diet.name} fue asignada correctamente a ${patient.name}.`);
    setConfirmation(null);
    window.setTimeout(() => setNotice(null), 5000);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main-content" aria-label="Ir al contenido principal">
          <span className="brand-mark"><Leaf size={22} strokeWidth={2.4} /></span>
          <span>
            <strong>Dietas Seguras</strong>
            <small>Prototipo académico · EPC28</small>
          </span>
        </a>

        <div className="topbar-actions">
          <span className="demo-badge"><Info size={15} /> Datos simulados</span>
          <span className="doctor-chip">
            <span className="doctor-avatar">LG</span>
            <span><strong>Dra. Laura Gómez</strong><small>Medicina nutricional</small></span>
          </span>
        </div>
      </header>

      <main id="main-content" className="page-content">
        <section className="hero-card" aria-labelledby="page-title">
          <div>
            <span className="eyebrow"><Stethoscope size={15} /> Asignación de tratamiento</span>
            <h1 id="page-title">Elige una dieta segura para cada paciente</h1>
            <p>
              El sistema relaciona el diagnóstico con el catálogo de dietas y verifica
              alergias e incompatibilidades antes de confirmar.
            </p>
          </div>
          <div className="flow-indicator" aria-label="Flujo de asignación">
            <span className="flow-step active"><b>1</b> Paciente</span>
            <ArrowRight size={16} />
            <span className="flow-step active"><b>2</b> Dieta</span>
            <ArrowRight size={16} />
            <span className={`flow-step ${activeAssignment ? "active" : ""}`}><b>3</b> Confirmación</span>
          </div>
        </section>

        {notice && (
          <div className="success-toast" role="status">
            <CheckCircle2 size={21} />
            <span><strong>Asignación completada</strong>{notice}</span>
            <button onClick={() => setNotice(null)} aria-label="Cerrar notificación"><X size={18} /></button>
          </div>
        )}

        <div className="workspace-grid">
          <aside className="patient-panel" aria-labelledby="patient-heading">
            <div className="section-heading">
              <span className="heading-icon"><UserRound size={20} /></span>
              <div>
                <span className="step-label">Paso 1</span>
                <h2 id="patient-heading">Paciente</h2>
              </div>
            </div>

            <label className="select-label" htmlFor="patient-select">Paciente a evaluar</label>
            <div className="select-wrap">
              <Search size={18} />
              <select
                id="patient-select"
                value={patient.id}
                onChange={(event) => setPatientId(event.target.value)}
              >
                {patients.map((item) => (
                  <option key={item.id} value={item.id}>{item.name} · {item.document}</option>
                ))}
              </select>
              <ChevronDown size={17} />
            </div>

            <article className="patient-card">
              <div className="patient-card-head">
                <span className="large-avatar">{patient.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                <div>
                  <h3>{patient.name}</h3>
                  <p>{patient.document} · {patient.age} años · {patient.sex}</p>
                </div>
              </div>

              <div className="clinical-block">
                <span className="clinical-label"><Activity size={15} /> Diagnóstico registrado</span>
                <strong>{getDiseaseNames(patient)}</strong>
              </div>

              <div className="risk-section">
                <span className="clinical-label"><ShieldAlert size={15} /> Factores de seguridad</span>
                <div className="risk-row">
                  <span>Alergias</span>
                  <div>{patient.allergies.length ? patient.allergies.map((item) => <b className="risk-pill critical" key={item}>{item}</b>) : <b className="neutral-pill">Ninguna</b>}</div>
                </div>
                <div className="risk-row">
                  <span>Incompatibilidades</span>
                  <div>{patient.incompatibilities.length ? patient.incompatibilities.map((item) => <b className="risk-pill warning" key={item}>{item}</b>) : <b className="neutral-pill">Ninguna</b>}</div>
                </div>
              </div>

              {activeAssignment && (
                <div className="current-assignment">
                  <CheckCircle2 size={18} />
                  <span><small>Dieta asignada</small><strong>{activeAssignment.name}</strong></span>
                </div>
              )}
            </article>

            <div className="privacy-note">
              <LockKeyhole size={16} />
              <p><strong>Entorno académico</strong>Todos los nombres y datos clínicos son ficticios.</p>
            </div>
          </aside>

          <section className="diet-panel" aria-labelledby="diet-heading">
            <div className="diet-panel-head">
              <div className="section-heading">
                <span className="heading-icon green"><HeartPulse size={20} /></span>
                <div>
                  <span className="step-label">Paso 2</span>
                  <h2 id="diet-heading">Dietas asociadas</h2>
                </div>
              </div>
              <div className="result-summary" aria-label={`${evaluations.length} dietas encontradas, ${safeCount} seguras`}>
                <span>{evaluations.length} encontradas</span>
                <strong><ShieldCheck size={16} /> {safeCount} seguras</strong>
              </div>
            </div>

            <div className="context-banner">
              <Check size={17} />
              <span>Resultados para <strong>{getDiseaseNames(patient)}</strong>, ordenados por seguridad.</span>
            </div>

            <div className="diet-list">
              {evaluations.map((evaluation, index) => (
                <DietCard
                  key={evaluation.diet.id}
                  evaluation={evaluation}
                  recommended={index === 0 && evaluation.isSafe}
                  assigned={activeAssignment?.id === evaluation.diet.id}
                  onDetails={() => setDetails(evaluation)}
                  onAssign={() => setConfirmation(evaluation)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer>
        <span>Prototipo funcional de alta fidelidad</span>
        <span>EPC28 · Ingeniería de Requisitos</span>
      </footer>

      {details && (
        <DietDetails
          evaluation={details}
          patient={patient}
          onClose={() => setDetails(null)}
          onAssign={() => {
            if (details.isSafe) {
              setConfirmation(details);
              setDetails(null);
            }
          }}
        />
      )}

      {confirmation && (
        <ConfirmationModal
          evaluation={confirmation}
          patient={patient}
          onCancel={() => setConfirmation(null)}
          onConfirm={confirmAssignment}
        />
      )}
    </div>
  );
}

interface DietCardProps {
  evaluation: DietEvaluation;
  recommended: boolean;
  assigned: boolean;
  onDetails: () => void;
  onAssign: () => void;
}

function DietCard({ evaluation, recommended, assigned, onDetails, onAssign }: DietCardProps) {
  const { diet, conflicts, isSafe, matchScore } = evaluation;
  return (
    <article className={`diet-card ${isSafe ? "safe" : "unsafe"} ${assigned ? "assigned" : ""}`}>
      <div className="diet-status-column">
        <span className={`status-symbol ${isSafe ? "safe" : "unsafe"}`}>
          {isSafe ? <ShieldCheck size={23} /> : <ShieldAlert size={23} />}
        </span>
        <span className="match-score">{matchScore}%<small>coincidencia</small></span>
      </div>

      <div className="diet-card-content">
        <div className="diet-title-row">
          <div>
            <span className={`status-label ${isSafe ? "safe" : "unsafe"}`}>
              {isSafe ? "Apta para asignación" : "Requiere atención"}
            </span>
            {recommended && <span className="recommended-label">Recomendada</span>}
            {assigned && <span className="assigned-label">Asignada</span>}
            <h3>{diet.name}</h3>
          </div>
        </div>
        <p className="diet-summary">{diet.summary}</p>

        {conflicts.length > 0 ? (
          <div className="conflict-box" role="alert">
            <AlertTriangle size={19} />
            <div>
              <strong>{conflicts.length === 1 ? "Alerta de seguridad" : `${conflicts.length} alertas de seguridad`}</strong>
              {conflicts.map((conflict) => <span key={`${conflict.type}-${conflict.ingredient}`}>{conflict.message}</span>)}
            </div>
          </div>
        ) : (
          <div className="safe-box"><CheckCircle2 size={18} /> No se detectaron alergias ni incompatibilidades.</div>
        )}

        <div className="diet-metadata">
          <span><b>Aporte</b>{diet.calories}</span>
          <span><b>Duración</b>{diet.duration}</span>
          <span><b>Frecuencia</b>{diet.frequency}</span>
        </div>

        <div className="card-actions">
          <button className="secondary-button" onClick={onDetails}><FileText size={17} /> Ver ficha técnica</button>
          <button
            className="primary-button"
            onClick={onAssign}
            disabled={!isSafe || assigned}
            title={!isSafe ? "No se puede asignar una dieta con alertas" : undefined}
          >
            {assigned ? <><Check size={17} /> Dieta asignada</> : <><ClipboardCheck size={17} /> Asignar dieta</>}
          </button>
        </div>
      </div>
    </article>
  );
}

interface DetailsProps {
  evaluation: DietEvaluation;
  patient: Patient;
  onClose: () => void;
  onAssign: () => void;
}

function DietDetails({ evaluation, patient, onClose, onAssign }: DetailsProps) {
  const { diet, conflicts, isSafe } = evaluation;
  return (
    <div className="drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="details-drawer" role="dialog" aria-modal="true" aria-labelledby="details-title">
        <div className="drawer-head">
          <div>
            <span className="eyebrow"><FileText size={15} /> Ficha técnica</span>
            <h2 id="details-title">{diet.name}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar ficha técnica"><X size={21} /></button>
        </div>

        <div className="patient-context-strip">
          <span className="mini-avatar">{patient.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
          <div><small>Contexto del paciente</small><strong>{patient.name}</strong><span>{getDiseaseNames(patient)}</span></div>
        </div>

        <div className={`drawer-safety ${isSafe ? "safe" : "unsafe"}`}>
          {isSafe ? <ShieldCheck size={22} /> : <ShieldAlert size={22} />}
          <div>
            <strong>{isSafe ? "Compatible con el perfil registrado" : "Dieta no asignable"}</strong>
            <span>{isSafe ? "No se detectaron conflictos clínicos en los datos simulados." : "Revisa las alertas antes de continuar."}</span>
          </div>
        </div>

        {conflicts.length > 0 && (
          <section className="details-section alert-section">
            <h3>Alertas encontradas</h3>
            {conflicts.map((conflict) => (
              <div className="detail-alert" key={`${conflict.type}-${conflict.ingredient}`}>
                <AlertTriangle size={18} /> <span>{conflict.message}</span>
              </div>
            ))}
          </section>
        )}

        <section className="details-section">
          <h3>Objetivo terapéutico</h3>
          <p>{diet.objective}</p>
        </section>

        <section className="details-section">
          <h3>Información de la pauta</h3>
          <dl className="technical-grid">
            <div><dt>Aporte calórico</dt><dd>{diet.calories}</dd></div>
            <div><dt>Duración</dt><dd>{diet.duration}</dd></div>
            <div><dt>Frecuencia</dt><dd>{diet.frequency}</dd></div>
            <div><dt>Vía</dt><dd>{diet.route}</dd></div>
          </dl>
        </section>

        <section className="details-section">
          <h3>Componentes principales</h3>
          <div className="ingredient-list">
            {diet.ingredients.map((ingredient) => (
              <span key={ingredient.name}><Leaf size={14} /> {ingredient.name}</span>
            ))}
          </div>
        </section>

        <section className="details-section">
          <h3>Recomendaciones</h3>
          <ul className="recommendation-list">
            {diet.recommendations.map((recommendation) => <li key={recommendation}><Check size={16} /> {recommendation}</li>)}
          </ul>
        </section>

        <div className="drawer-actions">
          <button className="secondary-button" onClick={onClose}>Volver a las dietas</button>
          <button className="primary-button" onClick={onAssign} disabled={!isSafe}>
            {isSafe ? <><ClipboardCheck size={17} /> Asignar esta dieta</> : <><ShieldAlert size={17} /> Asignación bloqueada</>}
          </button>
        </div>
      </aside>
    </div>
  );
}

interface ConfirmationProps {
  evaluation: DietEvaluation;
  patient: Patient;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmationModal({ evaluation, patient, onCancel, onConfirm }: ConfirmationProps) {
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
        <span className="confirmation-icon"><ClipboardCheck size={28} /></span>
        <span className="eyebrow">Paso 3 · Confirmación</span>
        <h2 id="confirmation-title">Confirmar asignación</h2>
        <p>Revisa el paciente y la dieta antes de guardar el tratamiento.</p>

        <div className="confirmation-summary">
          <div><small>Paciente</small><strong>{patient.name}</strong><span>{getDiseaseNames(patient)}</span></div>
          <ArrowRight size={19} />
          <div><small>Dieta seleccionada</small><strong>{evaluation.diet.name}</strong><span>{evaluation.diet.calories}</span></div>
        </div>

        <div className="verification-box">
          <ShieldCheck size={22} />
          <div><strong>Verificación completada</strong><span>No se detectaron alergias ni incompatibilidades.</span></div>
        </div>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onCancel}>Cancelar</button>
          <button className="primary-button" onClick={onConfirm}><Check size={18} /> Confirmar y asignar</button>
        </div>
      </section>
    </div>
  );
}

export default App;
