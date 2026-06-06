import React, { useState } from "react";

const Categories = ({ formData, setFormData, errors }) => {
    const [openGroup, setOpenGroup] = useState(0);

    const categoriesData = [
        {
            name: "Industry",
            items: [
                "Chemical & Petrochemicals",
                "Commercial Equipment",
                "Computer & Peripherals",
                "Electrical Utilities & Downstream",
                "Marine",
                "Oil & Gas",
                "Solar",
                "Transportation/Vehicles/Mobile Assets",
                "Heavy Equipment",
                "Building Materials"
            ]
        }
    ];
    // Toggle individual item
    const handleItemChange = (item, group) => {
        let updated = [...formData.categories];

        const exists = updated.find(
            (c) => c.item === item && c.group === group
        );

        if (exists) {
            updated = updated.filter(
                (c) => !(c.item === item && c.group === group)
            );
        } else {
            updated.push({ group, item });
        }

        setFormData({ ...formData, categories: updated });
    };

    // Select all in group
    const handleGroupSelect = (groupName, items) => {
        let updated = [...formData.categories];

        const allSelected = items.every((item) =>
            updated.some((c) => c.item === item && c.group === groupName)
        );

        if (allSelected) {
            // remove all
            updated = updated.filter((c) => c.group !== groupName);
        } else {
            // add all
            items.forEach((item) => {
                if (
                    !updated.some(
                        (c) => c.item === item && c.group === groupName
                    )
                ) {
                    updated.push({ group: groupName, item });
                }
            });
        }

        setFormData({ ...formData, categories: updated });
    };

    // Remove from right panel
    const removeItem = (item, group) => {
        const updated = formData.categories.filter(
            (c) => !(c.item === item && c.group === group)
        );
        setFormData({ ...formData, categories: updated });
    };

    return (
        <div className="categories-container">
            {/* LEFT SIDE */}
            <div className="categories-left">
                <label>
                    <input
                        type="checkbox"
                        checked={
                            formData.categories.length > 0 &&
                            categoriesData.every((group) =>
                                group.items.every((item) =>
                                    formData.categories.some(
                                        (c) =>
                                            c.item === item &&
                                            c.group === group.name
                                    )
                                )
                            )
                        }
                        onChange={() => {
                            if (formData.categories.length > 0) {
                                setFormData({ ...formData, categories: [] });
                            } else {
                                let all = [];
                                categoriesData.forEach((g) => {
                                    g.items.forEach((i) =>
                                        all.push({ group: g.name, item: i })
                                    );
                                });
                                setFormData({ ...formData, categories: all });
                            }
                        }}
                    />
                    Select All
                </label>

                {categoriesData.map((group, idx) => (
                    <div key={idx}>
                        <div
                            className="group-title"
                            onClick={() =>
                                setOpenGroup(openGroup === idx ? null : idx)
                            }
                        >
                            {group.name}
                        </div>

                        {openGroup === idx && (
                            <div className="group-items">
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            handleGroupSelect(
                                                group.name,
                                                group.items
                                            )
                                        }
                                        checked={group.items.every((item) =>
                                            formData.categories.some(
                                                (c) =>
                                                    c.item === item &&
                                                    c.group === group.name
                                            )
                                        )}
                                    />
                                    Select All
                                </label>

                                {group.items.map((item, i) => (
                                    <label key={i}>
                                        <input
                                            type="checkbox"
                                            checked={formData.categories.some(
                                                (c) =>
                                                    c.item === item &&
                                                    c.group === group.name
                                            )}
                                            onChange={() =>
                                                handleItemChange(
                                                    item,
                                                    group.name
                                                )
                                            }
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {errors.categories && (
                    <p className="error-text">{errors.categories}</p>
                )}
            </div>

            {/* RIGHT SIDE */}
            <div className="categories-right">
                <h4>My Current Selection</h4>

                {formData.categories.map((c, index) => (
                    <div key={index} className="selected-row">
                        <span>{c.group}</span>
                        <span>{c.item}</span>
                        <button onClick={() => removeItem(c.item, c.group)}>
                            🗙
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;