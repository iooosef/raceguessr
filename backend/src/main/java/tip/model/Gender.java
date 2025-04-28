package tip.model;

public enum Gender {
    MALE, FEMALE, NONBINARY, OTHERS;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
