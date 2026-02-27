export default function ReassuranceCard({ icon, alt, title, description }) {
    return (
        <div className="reassurance-item">
            <img src={icon} alt={alt} className="reassurance-icon" />
            <h3 className="reassurance-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    )
}
