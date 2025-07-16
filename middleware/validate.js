module.exports = (validate) => {
    return (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ msg: error.details[0].message });

        next();
    }
}