export const createCheckboxes = (obj, cb, path = "") => {
    return Object.entries(obj).map(([key, value]) => {
        const fullKey = path ? `${path}.${key}` : key;

        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            // Ichki obyekt — yana chuqurroq chaqiramiz
            return (
                <div key={fullKey} className="col">
                    <div className="col-12 fw-bold pt-1 pb-1 mb-3">{key}</div>
                    {createCheckboxes(value, fullKey)}
                </div>
            );
        } else if (
            typeof value === "boolean" || value === "true" || value === "false"
        ) {
            // Checkbox
            return (
                <div key={fullKey} className="col-12">
                    <input
                        type="checkbox"
                        checked={value === true || value === "true" || value === false || value === "false"}
                        name={key}
                        className="form-check-input"
                        onChange= {(e) => cb(e, fullKey)}
                        id={`${key}`}
                    />
                    <label htmlFor={`${key}`} className="form-check-label">{key}</label>
                </div>
            );
        }

        // Boshqa tipdagi qiymatlar (title, description) ni chiqarib o‘tamiz
        return null;
    });
};
