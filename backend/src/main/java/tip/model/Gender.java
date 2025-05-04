package tip.model;

public enum Gender {
    MALE, FEMALE, NONBINARY, OMIT;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
